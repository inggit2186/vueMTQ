<template>
    <div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <div class="categorieslist-section">
                <div class="container ">
                    <div class="dash-listingcontent dashboard-info">
                        <div class="dash-cards card"> 
                            <div class="card-header">
                                <h4>Daftar Peserta • {{ golongan }} •</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div v-if="loading" class="text-center">
                                        <hr>
                                        <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                                        <br>
                                        <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                                        <h3>:::Mohon Tunggu Sebentar :::</h3>
                                        <hr>
                                    </div>
                                    <div v-else v-for="(itemx,i) in paginatedLayanan" :key="itemx.id" class="col-lg-3 col-md-4 centered">
                                        <div class="categories-content">
                                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                            <img :src="itemx.pp" style="max-width: 200px;max-height: 250px;" alt="car1" @error="handleBrokenImage(itemx)">
                                            <h6>{{ itemx.name }}</h6>
                                            <span style="font-size: small;font-weight: 600;"><p v-if="itemx.teamstatus > 0 ">Team {{ itemx.team }} </p> {{ itemx.jk }}</span>
                                            <span style="font-size: small;font-style: italic;">{{ itemx.kontingen }}</span><br/>
                                            <BButton size="sm" variant="info" style="max-width:50%;float:left;font-weight: 700" @click.prevent="loot(itemx.id,itemx.jk,itemx.nomor)">
                                                <span v-if="itemx.nomor == 0" style="font-size:16px; font-weight: 700;">Nomor Loot</span>
                                                <span v-else style="font-size:14px; font-weight: 600;">• No.Loot •<br/><p style="font-size:18px; font-weight: 1000;">{{ kategori.kode ?? ''}}.{{ itemx.nomor }}</p></span>
                                            </BButton>
                                            <BButton size="sm" variant="warning" style="max-width:50%;float:right;font-weight: 700" @click.prevent="maqra(itemx.id)">
                                                Maqra'
                                            </BButton>
                                            </a>								   
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
            title: "Peserta MTQ",
            text: "Home",
            text1: "Cabang MTQ",
            text2: "Peserta",
            name: "/",
            loading: false,
            lootx: null,
            itemsPerPage: 12,
            currentPage: 1,
            cabangx: null,
            kategori: null,
            golongan:null,
            cabang: [],
            submenu: []
        }
    },
    computed: {
    	paginatedLayanan() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.cabang.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.cabang.length / this.itemsPerPage);
        },
		tujuLayanan() {
        	return id => `/cabangmtq/${id}`
    	},
	},
	created() {
		this.getCabang(),
		window.scrollTo(0,0)
	},
	methods: {
		async getCabang() {
			this.loading = true;
			try{
				const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/pesertaMTQ/'+sid,{headers})
				
				if(response.data.success == true){
					this.cabang = response.data.data
                    this.cabangx = response.data.cabang
                    this.kategori = response.data.kategori
                    this.lootx = response.data.loot
                    this.golongan = response.data.kategori.golongan
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
		},

        async loot(id,jk,nomor) {
            let nomorx
            if(nomor == 0){
                this.$swal.fire({
					title: 'Apakah anda siap?',
					text: "Nomor Loot Akan Diambil secara Random/Otomatis!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, Ambil Nomor!',
					showLoaderOnConfirm: true,
                    preConfirm: async (loot) => {
                        const sid = this.$route.params.id
                        try {
                            nomorx = this.generateRandom(this.kategori.min,this.kategori.max,JSON.stringify(this.lootx),jk)
                
                            const headers = {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                };

                            const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getLoot',{
                                sid: sid,
                                id: id,
                                lootx: nomorx
                            },{headers})

                            if(response.data.success == true){
                                this.cabang = response.data.data
                                this.lootx = response.data.loot
                                
                                return 'berhasil';
                            }else{
                                return response.data.message;
                            }
                            } catch (error) {
                                Swal.showValidationMessage(`
                                    Request failed: ${error}
                                `);
                            }
                    },
                    allowOutsideClick: () => !this.$swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if(result.value == 'berhasil'){
                                this.$swal.fire({
                                    title: 'Nomor Loot Peserta !',
                                    html: `<i class="fa-solid fa-key" style="font-size: 60px"></i><hr/><span style="font-size: 100px">${this.kategori.kode ?? '' }.${nomorx}</span><hr/>`,
                                    icon: 'success',
                                })
                            }else{
                                this.$swal.fire({
                                    title: 'Gagal !',
                                    text: result.value,
                                    icon: 'error',
                                })
                            }
                        }
                    });
                }else{
                    this.$swal.fire({
					title: 'Nomor Loot Sudah Diambil !!',
					html: `<i class="fa-solid fa-key" style="font-size: 60px"></i><hr/><span style="font-size: 100px">${this.kategori.kode ?? '' }.${nomor}</span><hr/>
                            <span style="font-size: 16px;font-style: italic;"> Apakah Anda Ingin Mengambil Ulang Nomor Loot ? </span><br/><br/><br/><br/>`,
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, Ambil Nomor Baru!',
					showLoaderOnConfirm: true,
                    preConfirm: async (loot) => {
                        const sid = this.$route.params.id
                        try {
                            nomorx = this.generateRandom(this.kategori.min,this.kategori.max,JSON.stringify(this.lootx),jk)
                
                            const headers = {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                };

                            const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getLoot',{
                                sid: sid,
                                id: id,
                                lootx: nomorx
                            },{headers})

                            if(response.data.success == true){
                                this.cabang = response.data.data
                                this.lootx = response.data.loot
                                
                                return 'berhasil';
                            }else{
                                return response.data.message;
                            }
                            } catch (error) {
                                Swal.showValidationMessage(`
                                    Request failed: ${error}
                                `);
                            }
                    },
                    allowOutsideClick: () => !this.$swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if(result.value == 'berhasil'){
                                this.$swal.fire({
                                    title: 'Nomor Loot Peserta !',
                                    html: `<i class="fa-solid fa-key" style="font-size: 60px"></i><hr/><span style="font-size: 100px">${this.kategori.kode ?? '' }.${nomorx}</span><hr/>`,
                                    icon: 'success',
                                })
                            }else{
                                this.$swal.fire({
                                    title: 'Gagal !',
                                    text: result.value,
                                    icon: 'error',
                                })
                            }
                        }
                    });
                }
        },

        generateRandom(min, max, exclude, jk) {
            let random;
            let x;
                while (!random) { 
                    
                    if(jk == 'Putra'){  
                        x = (Math.floor(Math.random() * (max - min + 1)/2) + min/2)*2+1;
                    }else{
                        x = (Math.floor(Math.random() * (max - min + 1)/2) + min/2)*2;
                    }
                    
                    if (exclude.indexOf(x) === -1) random = x;
                }
            return random;
        },

        async maqra() {
            console.log('xxxxxxxssssssssssssss')
        }
	}
}
</script>