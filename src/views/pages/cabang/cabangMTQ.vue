<template>
    <div class="main-wrapper" style="width: 94%;">
        <layouts></layouts>

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            <!-- Bookmark Content -->
            <div class="dashboard-content">		
                    <div class="container">	
                        <satkermenu />		
                        <div class="bookmarks-content grid-view featured-slider">
                            <div class="row" :disabled="loading">
                                <div v-if="loading" class="text-center">
                                    <hr>
                                    <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                                    <br>
                                    <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                                    <h3>::: Nyangkul Data dulu :::</h3>
                                    <hr>
                                </div>
                                <div v-for="item in paginatedSeksi" v-else id="item" :key="item.id" class="col-lg-4 col-md-4 col-sm-6 centered">
                                    <div class="card aos aos-init aos-animate" data-aos="fade-up">
                                        <div class="blog-widget">
                                            <div class="blog-img">
                                                <router-link :to="routeSeksi(item.id)">
                                                    <img :src="$assets+'/img/seksi/'+item.imgid+'.png'" class="img-fluid" alt="blog-img" @error="handleBrokenImage(item)">
                                                </router-link>
                                                <div class="fav-item">
                                                    <span class="Featured-text">{{item.kategori.toUpperCase()}}</span>
                                                        <a href="javascript:void(0)" class="fav-icon">
                                                            <i class="feather-heart"></i>
                                                        </a>										
                                                </div>	
                                            </div>
                                            <div class="bloglist-content">
                                                <div class="card-body">
                                                    <div class="blogfeaturelink">
                                                        <div class="grid-author">
                                                            <img :src="item.ppkepala ?? $assets+'/img/profiles/avatar-01.jpg'" alt="author">
                                                        </div>
                                                        <div class="blog-features">
                                                        <a href="javascript:void(0)"><span> <i class="fa-regular fa-circle-stop"></i> {{ item.penanya }}</span></a>
                                                        </div>																	  
                                                        <div class="blog-author text-end"> 
                                                            <span> <i class="feather-user"></i>20</span>
                                                        </div>
                                                    </div> 
                                                    <h6><router-link :to="routeSeksi(item.id)">{{ item.kategori }}</router-link></h6>																	 
                                                    <div class="blog-location-details">
                                                        <div class="location-info">
                                                        <i class="feather-map-pin"></i> Kec. Rambatan
                                                        </div>
                                                        <div class="location-info">
                                                            <i class="fa-solid fa-calendar-days"></i> September 2024
                                                        </div>
                                                    </div>
                                                    <div class="amount-details">
                                                        <div class="ratings">
                                                            <span>e-MTQ 2024</span> (Kankemenag Kab.Tanah Datar)
                                                        </div>												
                                                    </div>	
                                                </div>	
                                            </div>			 
                                        </div> 
                                    </div>
                                </div>
                                
                                <!--Pagination--> 
                                <div class="blog-pagination">
                                    <nav>
                                        <ul class="pagination">
                                            <li class="page-item previtem" :class="{'disabled': currentPage === 1}">
                                                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"><i class="fas fa-regular fa-arrow-left"></i> Prev</a>
                                            </li>
                                            <li class="justify-content-center pagination-center"> 
                                                <div class="pagelink">
                                                    <ul>
                                                        <li v-for="page in displayedPages" :key="page" class="page-item" :class="{'active': currentPage === page}">
                                                            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                                        </li>
                                                        <li class="page-item" :class="{'disabled': currentPage === totalPages}">
                                                            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">...</a>
                                                    </li>
                                                </ul>
                                                </div>													
                                            </li>													
                                            <li class="page-item nextlink" :class="{'disabled': currentPage === totalPages}">
                                                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next <i class="fas fa-regular fa-arrow-right"></i></a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <!--/Pagination-->	
                                
                            </div>						
                        </div>
                    </div>		
            </div>		
		    <!-- /Bookmark Content -->
            <foot /> 

            <scroll />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navid: this.$route.params.id,
            title: "Cabang MTQ",
            text: "Home",
            text1: "Cabang MTQ",
            name: "/",
            loading: false,
            nav: this.nav,
            itemsPerPage: 9,
            currentPage: 1,
            imgid: null,
            seksi: []
        }
    },
    computed: {
    	paginatedSeksi() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.seksi.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.seksi.length / this.itemsPerPage);
        },
		routeSeksi() {
        	return id => `/cabangmtq/${this.navid}/${id}`;
    	},
	},
	created() {
		this.getSeksi(),
		window.scrollTo(0,0)
	},
	methods: {
		async getSeksi() {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getCabang',{headers})
				this.seksi = response.data.data
		
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loading = false
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		handleBrokenImage(item) {
			item.imgid = Math.floor(Math.random() * (416 - 405 + 1)) + 405;
		},
	}
}
</script>

<style>
.PTSP img{
	width: 100%;
    height: 100%;
    margin-bottom: 5px;
}
</style>