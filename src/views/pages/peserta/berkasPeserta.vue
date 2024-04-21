<template>
    <div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            <div class="dashboard-content">		
			<div class="container">
                <div  ref="scroll1st" class="pagination">
                    <a v-if="request.userrole == 'Official' || request.userrole == 'Peserta'" class="btn btn-primary" href="#" @click="$router.push({path: '/registrasi'})"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                    <a v-else class="btn btn-primary" href="#" @click="$router.push({path: `/kontingen/verif/${this.request.kontingen_id}`})"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                </div>
                <hr/>
                <b-form @submit.prevent="addRequest">
                <div v-if="loading" class="text-center">
                    <hr>
                    <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                    <br>
                    <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                    <h3>::: Mencari Berkas Dulu :::</h3>
                    <hr>
                </div>
				<div v-else class="profile-content">
                    
                    <div v-if="datax" class="text-center">
                        <b-img :src="$assets+'/img/ikon/404nodata.png'" v-bind="mainProps" rounded width="350%"></b-img>
                        <hr>
                    </div>
				    <div v-else class="card media-section">
						    <div class="card-header">
                                <div style="font-size:18px;float:right;">
                                        <BBadge v-if="request.status == 1" variant="light">BELUM LENGKAP</BBadge>
                                        <BBadge v-else-if="request.status == 2" variant="warning">DIAJUKAN</BBadge>
                                        <BBadge v-else-if="request.status == 3" variant="primary">DISETUJUI</BBadge>
                                        <BBadge v-else-if="request.status == 4" variant="danger">DITOLAK</BBadge>
                                        <BBadge v-else-if="request.status == 5" variant="dark">DISKUALIFIKASI</BBadge>
                                </div>
							    <h4>Upload File-File Syarat</h4>
                                <hr/>
                                <div v-if="request.userrole == 'Official' || request.userrole == 'Peserta'">
                                    <div v-if="request.status == 1" style="float:right;">
                                        <BButton block size="lg" variant="warning" @click="newRequest()" :disabled="loadingRequest">
                                            <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Kirim Pengajuan</b></span>
                                            <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                        </BButton>
                                        <br/>
                                        <br/>
                                        <BButton block size="lg" variant="danger" @click="editRequest()" :disabled="loadingRequest">
                                            <span v-if="!loadingRequest"><b><i-icomoon-free-profile /> &nbsp;&nbsp;Edit Profil</b></span>
                                            <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                        </BButton>
                                    </div>
                                    <div v-if="request.status == 4" style="float:right;">
                                        <BButton block size="lg" variant="warning" @click="newRequest()" :disabled="loadingRequest">
                                            <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Ajukan Ulang</b></span>
                                            <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                        </BButton>
                                        <br/>
                                        <br/>
                                        <BButton block size="lg" variant="danger" @click="editRequest()" :disabled="loadingRequest">
                                            <span v-if="!loadingRequest"><b><i-icomoon-free-profile /> &nbsp;&nbsp;Edit Profil</b></span>
                                            <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                        </BButton>
                                    </div>
                                    <div v-if="request.status == 2" style="float:right;">
                                        <BButton block size="lg" variant="danger" @click="cancelRequest()" :disabled="loadingRequest">
                                            <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Batalkan Pengajuan</b></span>
                                            <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; Proses Pembatalan....</b></span>
                                        </BButton>
                                    </div>
                                </div>
                                <div v-else-if="request.userrole == 'Admin' || request.userrole == 'Petugas'">
                                    <div v-if="request.status != 1" style="float:right;">
                                        <BButton block size="lg" variant="danger" @click="verify(request.id)" :disabled="loadingRequest">
                                            <span v-if="!loadingRequest"><b><i-uil-comment-verify /> &nbsp;&nbsp;Verifikasi</b></span>
                                            <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                        </BButton>
                                        <br/>
                                        <br/>
                                        <BButton block size="lg" variant="dark" @click="dnq(request.id)" :disabled="loadingRequest">
                                            <span v-if="!loadingRequest"><b><i-guidance-forbidden-2/> &nbsp;&nbsp;Diskualifikasi</b></span>
                                            <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                        </BButton>
                                    </div>
                                </div>
                                
                                <table>
                                    <td colspan="5" style="vertical-align: middle;padding: 0 23px 0 15px">
                                        <img :src="request.pp" style="max-width: 130px;max-height: 180px;margin-bottom: 4px;" />
                                    </td>
                                    <td style="font-size:16px;">
                                        <tr>
                                            <td>Kontingen </td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><BBadge style="font-size:14px;" variant="secondary">{{ request.kontingenx }}</BBadge></td>
                                        </tr>
                                        <tr>
                                            <td>Cabang</td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td> <BBadge style="font-size:14px;" variant="warning">{{ request.kategori }}</BBadge></td>
                                        </tr>
                                        <tr>
                                            <td>Nama </td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>{{ request.name }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>NIK </td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>{{ request.nik }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Nomor KK </td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>{{ request.kk }}</b></td>
                                        </tr>
                                    </td>
                                    </table>
                                    <hr/>
                                    <table align="center" style="font-size:16px;">
                                    <tr>
                                    <td style="padding-right: 30px;float: left;border-right: solid 1px;">
                                        <tr>
                                            <td>Tempat, Tanggal Lahir </td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>{{ request.tempat_lahir }}, {{ request.tanggallahir }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Umur</td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>{{ request.umur }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Kontak / Whatsapp</td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>+62 {{ request.telp }}</b></td>
                                        </tr>
                                    </td>
                                    <td style="padding-left: 30px;padding-right: 30px;float: right;border-right: solid 1px;">
                                        <tr>
                                            <td>Pekerjaan</td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>{{ request.pekerjaan }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Sekolah/Tempat Kerja</td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>{{ request.satker }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>{{ request.email }}</b></td>
                                        </tr>
                                    </td>
                                    </tr>
                                    <hr/>
                                    <tr align="center">
                                        <tr colspan="2">
                                            <td>Alamat Lengkap</td>
                                            <td>&nbsp; : &nbsp;</td>
                                            <td><b>{{ request.alamat }}</b></td>
                                        </tr>
                                    </tr>
                                </table>
                                <br/>			
							</div>
                            <div class="card-body">
                                <div v-if="request.status != 1">
                                    <div class="text-center">
                                    <b-img :src="$assets+'/img/ikonMTQ/'+request.status+'.png'" v-bind="mainProps" rounded width="350%"></b-img>
                                    </div>
                                </div>
                                <hr/>
                                <span style="font-size: small;"><b><i>*) Wajib Diupload/Diisi</i></b></span>
							    <div class="row">
									<div class="row">
                                        <div v-for="item in syarat" id="item" :key="item.id" class="col-lg-4 col-md-4 featured-img1 centered">
                                            <div class="media-image" v-b-tooltip="item.keterangan">
                                                <h6 class="media-title">{{ item.nama }}<span v-if="item.wajib == 1">*</span></h6>
                                                    <img v-if="item.fileUrl != 'NONE'" :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(item.fileUrl)" />
                                                    <img v-else :src="$assets+'/img/ikon/filenotfound.png'" />
                                                <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                                    <p class="my-4">Cek File!</p>
                                                </BModal>
                                                <hr/>
                                                <div v-if="request.userrole == 'Official' || request.userrole == 'Peserta'">
                                                    <div class="settings-upload-btn" v-if="request.status == 1 || request.status == 2 || request.status == 4">
                                                        <input id="file" type="file" name="image" class="hide-input image-upload" :disabled="loadingfile[item.id]" @change="onFileChange(item.id, $event)">
                                                        <label v-if="!loadingfile[item.id]" for="file" class="file-upload">
                                                            <span v-if="item.filename == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                            <span v-else><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                                        </label>
                                                        <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                                    </div>
                                                    <br/>
                                                    <div>
                                                        <BButton v-if="item.filename != null && item.filename != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFile(item.id)">
                                                            <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                                        </BButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
									</div>										
								</div>					
							</div>
                            <div>
                                <hr>
                                <h2 class="text-center" style="font-weight: 700;"><i-ant-design-comment-outlined /> KOMENTAR</h2>
                                <br/>
                                <div v-for="komen in komen" :key="komen.id">
                                    <table v-if="komen.st =='petugas'" style="margin:10px 10px 10px 10px;" class="d-none d-md-block">
                                            <tr><td class="pp">
                                            <img class="imgkomen" src="data:image/png;base64,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" />
                                            <br />
                                            <span>{{ komen.sender }}</span></td>
                                            <td class="comment bubble">{{ komen.komen }}<br /><br /> <p style="text-align:right;font-size:12px;"><i>{{ komen.waktu }}</i></p></td></tr>
                                            <tr><td colspan=2>&nbsp;</td></tr>
                                    </table>
                                    <table v-else style="margin:10px 10px 10px 10px;" class="d-none d-md-block">
                                            <tr>
                                            <td class="comment bubble2">{{ komen.komen }}<br /><br /> <p style="text-align:right;font-size:12px;"><i>{{ komen.waktu }}</i></p></td>
                                            <td class="pp2">
                                            <img class="imgkomen" style="width: 70%;" src="data:image/png;base64,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" />
                                            <br />
                                            <span>{{ komen.sender }}</span></td></tr>
                                    </table>
                                        <div v-if="komen.st =='petugas'" class="comment bubble d-block d-sm-block d-md-none" style="margin:10px 10px 10px 10px;">{{ komen.komen }}<br /><br /> <p style="text-align:right;font-size:12px;"><i>{{ komen.waktu }}</i></p></div>
                                        <div v-else class="comment bubble2 d-block d-sm-block d-md-none" style="margin:10px 10px 10px 10px;">{{ komen.komen }}<br /><br /> <p style="text-align:right;font-size:12px;"><i>{{ komen.waktu }}</i></p></div>
                                </div>
                                <div>
                                    <b-form-input v-model="input.komen" type="text" class="form-control pass-input" @keypress.enter.prevent="onEnter" placeholder="Komentar Anda... Tekan Enter untuk Mengirim" :disabled="loadingkomen"/>
                                </div>
                            </div>
						</div>				
				</div>
                </b-form>
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
            title: "Upload File Syarat",
            text: "Home",
            text1: "Upload Syarat",
            name: "/",
            datax: false,
            loading: false,
            loadingRequest: false,
            loadingkomen: false,
            loadingfile: [],
            imageUrl: [],
            syarat: [],
            komen: [],
            input: [],
            request: null,
        }
    },
    created() {
        this.getRequest(),
        this.date = new Date(),
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });
    },
    methods: {
        async getRequest() {
			this.loading = true;
			try{
                const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getBerkas/'+sid,{headers})

                if(response.data.success == true){
				    this.request = response.data.data
                    this.syarat = response.data.syarat
                    this.komen = response.data.komen
                }else{
                    this.$swal.fire({
                        title: 'Akses Ditolak!',
                        html: response.data.message,
                        icon: 'error',
                    })
                    this.$router.go(-1);
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
        onFileChange(itemId, event) {
		    const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                this.fileUrl = event.target.result
                this.fileSize = file.size
                this.fileName = file.name

                if(itemId == 1){
                    if(file.size > 1046000){
                        this.$toast.fire({
                            title: "File Tidak Boleh lebih dari 1MB !",
                            icon: "warning"
                        });
                    }else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg'){
                        this.$toast.fire({
                            title: "File harus tipe Image/Gambar .PNG .JPG .JPEG !",
                            icon: "warning"
                        });
                    }else{
                        this.uploadSyarat(itemId)
                    }
                }else{
                    if(file.size > 1046000){
                        this.$toast.fire({
                            title: "File Tidak Boleh lebih dari 1MB !",
                            icon: "warning"
                        });
                    }else if(file.type != 'application/pdf'){
                        this.$toast.fire({
                            title: "File harus tipe .PDF !",
                            icon: "warning"
                        });
                    }else{
                        this.uploadSyarat(itemId)
                    }
                }
                
            }

            reader.readAsDataURL(file)
		},
        async uploadSyarat(itemId) {
			try{
				this.loadingfile[itemId] = true

                const userid = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadSyarat',{
					userid: userid,
                    id: itemId,
                    filex: this.fileUrl,
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.syarat = response.data.syarat
                }
                
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingfile[itemId] = false
			}
		},
        openFile(item) {
            let frame = null;
            let isPDF = item.toLowerCase().endsWith('.pdf');
            let isWord = item.toLowerCase().endsWith('.doc') || item.toLowerCase().endsWith('.docx');
            
            if(isWord){
                frame = '<iframe src="https://docs.google.com/gview?url='+ item +'&embedded=true" width="100%" height="550" frameborder="1"></iframe>'
            }else{
                frame = '<iframe src="'+ item +'" width="100%" height="550"></iframe>'
            }

            if (window.innerWidth < 768) {
                this.$swal.fire({
                    width: "100%",
					allowOutsideClick: true,
                    html: frame,
                    showCloseButton: true,
                    focusConfirm: false,
                    showCancelButton: true,
                    cancelButtonText: 'Tutup',
                    confirmButtonText: "Download"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(item,'_blank');
                    }
                });
            }else{
                this.$swal.fire({
                    width: "50%",
                    html: frame,
                    showCloseButton: true,
                    focusConfirm: false,
                    showCancelButton: true,
                    cancelButtonText: 'Tutup',
                    confirmButtonText: "Download"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(item,'_blank');
                    }
                });
            }
        },
        async newRequest() {
            try{
				this.loadingRequest = true
                const userid = this.$route.params.id
                
                const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updatePeserta',{
                    statusx: 'new',
					userid: userid,
				}, {headers})
                
                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/registrasi')  
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
				this.loadingRequest = false
			}
        },
        editRequest() {
            this.$router.push(`/cabangmtq/edit/${this.request.teamstatus}/${this.request.maxteam}/${this.request.kategori_id}/${this.request.id}`)
        },
        async cancelRequest() {
            try{
				this.loadingRequest = true

                const userid = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updatePeserta',{
                    statusx: 'batal',
					userid: userid,
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.request.status = 1;
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
				this.loadingRequest = false
			}
        },
        async onEnter() {
            this.loadingkomen = true;
            try{
                const userid = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addKomen',{
					userid: userid,
                    komen: this.input.komen
				}, {headers})
                
                if(response.data.success == true){
                    this.komen = response.data.komen
                    this.input.komen = ''
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
				this.loadingkomen = false
			}
        },
        async deleteFile(itemid){
            this.$swal.fire({
                title: "Apakah Anda Yakin?",
                text: "Anda Tidak bisa untuk Membatalkannya!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showLoaderOnConfirm: true,
                confirmButtonText: "Ya, Hapus File ini!",
                preConfirm: async (deleteFile) => {
                    try {
                        const userid = this.$route.params.id
                        const headers = {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    };
                        
                        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteSyarat',{
                            userid: userid,
                            id: itemid,
                        }, {headers})

                        if(response.data.success == true){
                            this.syarat = response.data.syarat
                        }
                    } catch (error) {
                    this.$swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$toast.fire({
                    title: "File Telah Dihapus!",
                    icon: "success"
                    });
                }
            });
        },
        verify() {

        },

        async verify(userid) {
            if (window.innerWidth < 768) {
                this.$swal.fire({
                width: "100%",
                title: "Apakah Anda Yakin?",
                icon: "warning",
				allowOutsideClick: true,
				input: "textarea",
				inputLabel: "Alasan/Keterangan Verifikasi",
				inputPlaceholder: "Tulis Alasan/Keterangan Verifikasi Anda Disini...",
				inputAttributes: {
					"aria-label": "Tulis Alasan/Keterangan Verifikasi Anda Disini"
				},
				showConfirmButton: true,
				showDenyButton: true,
                confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SETUJUI`,
				denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;TOLAK`,
				returnInputValueOnDeny: true
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						this.updateStatus(userid,result.value,3)
					}
                    else if (result.isDenied) {
						this.updateStatus(userid,result.value,4)
					};
				});
            }else{
                this.$swal.fire({
                width: "50%",
                title: "Apakah Anda Yakin?",
                icon: "warning",
				input: "textarea",
				inputLabel: "Alasan/Keterangan Verifikasi",
				inputPlaceholder: "Tulis Alasan/Keterangan Verifikasi Anda Disini...",
				inputAttributes: {
					"aria-label": "Tulis Alasan/Keterangan Verifikasi Anda Disini"
				},
				showConfirmButton: true,
				showDenyButton: true,
                confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SETUJUI`,
				denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;TOLAK`,
				returnInputValueOnDeny: true
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						this.updateStatus(userid,result.value,3)
					}
                    else if (result.isDenied) {
						this.updateStatus(userid,result.value,4)
					};
				});
            }
        },
        async updateStatus(userid,komen,st) {
            this.loadingRequest = true;
            console.log(st)
            try{
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateStatus',{
					userid: userid,
                    komen: komen,
                    status: st
				}, {headers})
                
                if(response.data.success == true){
                    this.$router.push({path: `/kontingen/verif/${this.request.kontingen_id}`})
                        this.$toast.fire({
                        title: "Peserta telah Berhasil Diverifikasi!",
                        icon: "success"
                    });
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
				this.loadingRequest = false
			}
        },
        async dnq(userid) {
            this.$swal.fire({
                title: "Apakah Anda Yakin?",
                text: "Anda Tidak bisa untuk Membatalkannya!",
                icon: "warning",
                input: "textarea",
				inputLabel: "Alasan/Keterangan Diskualifikasi",
				inputPlaceholder: "Tulis Alasan/Keterangan Diskualifikasi Disini...",
				inputAttributes: {
					"aria-label": "Tulis Alasan/Keterangan Diskualifikasi Disini"
				},
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showLoaderOnConfirm: true,
                confirmButtonText: "Ya, Diskualifikasi Peserta ini!",
                preConfirm: async (xdnq) => {
                    try {
                        const headers = {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    };
                        
                        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/disqualify',{
                            userid: userid,
                            alasan: xdnq
                        }, {headers})

                        if(response.data.success == true){
                            this.syarat = response.data.syarat
                        }
                    } catch (error) {
                    this.$swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push({path: `/kontingen/verif/${this.request.kontingen_id}`})
                    this.$toast.fire({
                    title: "Peserta telah didiskualifikasi!",
                    icon: "success"
                    });
                }
            });
        }

    }
}
</script>

<style>
.comments {
  width: 430px;
  margin: 10px;
}

.pp {
	text-align: center;
	width:120px;
	float:left;
	margin-right: 20px;
}

.pp2 {
	text-align: center;
	width:120px;
	float:right;
	margin-left: 20px;
}

.imgkomen {
	border-radius: 50%;
	width:70%;
	height:100%;
}

.pp span {
	font-size: 12px;
	font-weight: bold;
}

.pp2 img {
	border-radius: 50%;
	width:100%;
	height:100%;
}

.pp2 span {
	font-size: 12px;
	font-weight: bold;
}

.comment {
  width: 100%;
  margin-bottom: 20px;
  color: white;
}

.bubble {
  position: relative;
  background: teal;
  padding: 20px;
  border-radius: 5px;
  margin-left: 20px;
}

.bubble:after {
  content: '';
  display: block;
  position: absolute;
  
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 15px solid teal;
  border-left: 15px solid transparent;
  
  left: -30px;
  top: 10px;
}

.bubble2 {
  position: relative;
  background: teal;
  padding: 20px;
  border-radius: 5px;
  margin-left: 20px;
}

.bubble2:after {
  content: '';
  display: block;
  position: absolute;
  
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 15px solid transparent;
  border-left: 15px solid teal;
  
  right: -30px;
  top: 10px;
}
</style>