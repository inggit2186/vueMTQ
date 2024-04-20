<template>
    <div class="main-wrapper">
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
                 <layouts></layouts>
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="card-header">
                                    <h4>Daftar Peserta MTQ •• {{ user.kontingen['kontingen'] }} ••</h4>
                                    <router-link :to="registrasi()">
                                    <a class="btn btn-danger" href="#" style="margin-left:5px;float:right;"><i-subway-add/> <b>TAMBAH PESERTA</b></a>
                                    </router-link>
                                </div>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
                                        <div class="group-img">
                                            <input type="text" v-model="keyword"  @input="filterTable" class="form-control" placeholder="Search...">
                                            <i class="feather-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover centered">
										<thead>
                                            <tr>
                                                <th v-for="column in columns2" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
                                                    {{ column.name }}
                                                </th>
                                            </tr>
                                        </thead>
										<tbody v-if="loading">
                                            <tr>
                                                <td colspan="5"><span style="font-size: 20px;"><i-svg-spinners-blocks-wave /><b> &nbsp;Mencari Data...</b></span></td>
                                            </tr>
                                        </tbody>
										<tbody v-else>
											<tr v-if="this.peserta.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="item in paginatedItem" :key="item.id">
                                                <td>
													<img :src="item.pp" style="max-width: 100px;max-height: 150px;margin-bottom: 4px;" /><br/>
													<BBadge style="font-size: small;" variant="primary"> {{ item.name }} </BBadge><br/>
													<BBadge pill style="font-size: smaller;" variant="success"> {{ item.nik }} </BBadge>
												</td>
												<td>
                                                    <span style="font-size: 14px;margin-bottom: 2px;font-weight: 600;"> {{ item.tempat_lahir }}, {{ item.tanggal_lahir }} </span><br/>
													<span style="font-size: 13px;margin-bottom: 2px;font-weight: 400;font-style: italic;">Umur : {{ item.umur }}</span>
                                                </td>
												<td>
													<BBadge pill style="font-size:12px" variant="primary">{{ item.jk }}<span v-if="item.teamstatus > 0"> • Team {{ item.team }}</span></BBadge><br/>
													<span style="font-size: 14px;margin-bottom: 2px;font-weight: 600;">{{ item.golongan }}</span><br/>
													<span style="font-size: 13px;margin-bottom: 2px;font-weight: 400;font-style: italic;">{{ item.cabang }}</span>
                                                </td>
                                                <td>
                                                    <BBadge v-if="item.status == 2" variant="warning">DIAJUKAN</BBadge>
                                                    <BBadge v-else-if="item.status == 3" variant="primary">DISETUJUI</BBadge>
                                                    <BBadge v-else-if="item.status == 5" variant="dark">DISKUALIFIKASI</BBadge>
                                                    <BBadge v-else-if="item.status == 4" variant="danger">DITOLAK</BBadge>
                                                    <BBadge v-else-if="item.status == 1" variant="secondary">BELUM LENGKAP</BBadge>
                                                    <br/>
                                                    <span v-if="item.status != 1" style="font-size: smaller;"><i><i-mdi-update /> Last Update : {{ item.update }}</i></span><br/>
													<span v-if="item.status != 2 && item.status != 1" style="font-size: smaller;"><i-mdi-person-tie /><i> {{ item.petugas }}	</i></span><br/>
													<span v-if="item.status != 2 && item.status != 1" style="font-size: smaller;"><i-mingcute-comment-fill /><i> {{ item.alasan }}	</i></span>
                                                </td>
												<td>
													<BButton pill size="sm" variant="outline-primary" @click.prevent="aksiStatus(item.id)"><b><i-mdi-call-to-action /> UPLOAD BERKAS</b></BButton>
												</td>
                                            </tr>
										</tbody>
                                    </table>
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
            <!-- /Dashboard Content -->

            <foot />

            <scroll />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        let user = JSON.parse(localStorage.getItem('user'));
        return {
            title: "Daftar Peserta MTQ",
            text: "Official",
            text1: "Peserta MTQ",
            name: "/",
            user: user,
			columns2: [
				{ name: 'Nama', data: 'name' },
				{ name: 'TTL', data: 'ttl' },
				{ name: 'Cabang', data: 'cabang' },
				{ name: 'Status', data: 'status' },
				{ name: 'Aksi', data: 'aksi' },
			],
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			peserta: [],
			peserta0: [],
            xid: null,
            sid: null
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			return this.peserta.sort((a, b) => {
				let modifier = 1;
				if(this.currentSortDir === 'desc') modifier = -1;
				if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
			},
    	paginatedItem() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.peserta.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.peserta.length / this.itemsPerPage);
        },
		registrasi() {
			return id => `/cabangmtq/reg`
		}
	},
  created() {
		this.getPeserta(),
		window.scrollTo(0,0)
	},
  methods: {
		async getPeserta() {
            this.sid = this.$route.params.id
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/regpeserta',{
					id: this.user.kontingen_id,
				},{headers})
				
				if(response.data.success == true){
                    console.log(response.data.data)
          			this.peserta0 = response.data.data
          			this.peserta = response.data.data
				}else{
					this.$toast.fire({
						title: response.data.message,
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
		aksiStatus(id){
			console.log(id)
			this.$router.push(`cabangmtq/reg/pesertafiles/upload/${id}`)
		},
		sortTable(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.peserta.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.peserta = this.peserta0;
			} else {
				this.peserta = this.peserta0.filter((item) => {
					return item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.golongan.toLowerCase().includes(this.keyword.toLowerCase()) || 
					item.nik.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
  }
}
</script>