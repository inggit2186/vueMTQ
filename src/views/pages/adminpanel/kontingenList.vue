<template>
    <div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <div class="categorieslist-section">
                <div class="container ">
                    <div class="row">
                        <div v-if="loading" class="text-center">
							<hr>
							<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
							<br>
							<i-svg-spinners-bars-scale style="font-size: 2em;"/>
							<h3>:::Mohon Tunggu Sebentar :::</h3>
							<hr>
						</div>
                        <div v-else v-for="itemx in paginatedLayanan" :key="itemx.id" class="col-lg-3 col-md-4 centered">
							<router-link :to='ruteTujuan(itemx.id)'>
							<div class="categories-content">
								<a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
								<img :src="$assets+'/img/ikon/'+itemx.imgid+'.png'" style="width:80%;" alt="car1" @error="handleBrokenImage(itemx)">
								<h6>{{ itemx.kontingen }}</h6>
								<span><BBadge size="sm" variant="info" style="max-width:50%;float:left">Putra : {{ itemx.jmlp }}</BBadge><BBadge size="sm" variant="warning" style="max-width:50%;float:right">Putri : {{ itemx.jmlw }}</BBadge></span>
								</a>								   
							</div>
							</router-link>
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

            <foot /> 

            <scroll />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
			navid: this.$route.params.xid,
			cid: this.$route.params.id,
            title: "Kontingen",
            text: "Home",
            text1: "Verifikasi",
            text2: "Kontingen",
            name: "/",
            loading: false,
            itemsPerPage: 12,
            currentPage: 1,
            xid: this.$route.params.id,
            kontingen: [],
            submenu: []
        }
    },
    computed: {
    	paginatedLayanan() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.kontingen.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.kontingen.length / this.itemsPerPage);
        },
		ruteTujuan() {
			return (id) => `/kontingen/verif/${id}`
		}
	},
	created() {
		this.getKontingen(),
		window.scrollTo(0,0)
	},
	methods: {
		async getKontingen() {
			this.loading = true;
			try{
				const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getkontingen/',{headers})
				
				if(response.data.success == true){
					this.kontingen = response.data.data
				}else{
					this.$toast.fire({
						title: response.data.data,
						icon: 'error',
					})
				}
		
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
			item.imgid = 'o-'+(Math.floor(Math.random() * 16) + 1);
		}
	}
}
</script>