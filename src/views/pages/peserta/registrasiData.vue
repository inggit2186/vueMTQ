<template>
    <div class="main-wrapper">
        <div class="page-wrapper">
            <breadcrumb :title="title" :nama="nama" :text="text" :text1="text1" />
                 <layouts></layouts>
                 <div class="col-lg-9 centered">
                                <div class="card dash-cards">
                                    <b-form @submit.prevent="updateProfil">
                                    <div class="card-body">
                                        <div class="profile-form">
                                            <div class="login-header">
                                                <h3>DATA PRIBADI</h3>
                                                <br/>							
                                            </div>
                                                <div class="form-group">
                                                    <label class="col-form-label">Nama Lengkap</label>
                                                    <div class="pass-group group-img">
                                                        <span class="lock-icon"><i class="feather-user"></i></span>
                                                        <b-form-input id="name" v-model="user.name" type="text" class="form-control" placeholder="Nama Lengkap" />													
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor Induk Kependudukan (NIK)*</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fas fa-credit-card" style="font-size:medium;"></i></span>
                                                                <b-form-input id="nik" v-model="user.nik" type="number" class="form-control" placeholder="NIK" />													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor Kartu Keluarga (KK)*</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-server"></i>
                                                                <b-form-input id="kk" v-model="user.kk" type="number" class="form-control" placeholder="Nomor KK" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tempat Lahir*</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fas fa-phone" style="font-size:medium;"></i></span>
                                                                <b-form-input id="tempat_lahir" v-model="user.tempat_lahir" type="text" class="form-control" placeholder="Tempat Lahir" />													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal Lahir</label>
                                                            <div class="group-img">
                                                                <i class="fa fa-bank"></i>
                                                                <VueDatePicker v-model="user.tanggal_lahir" format="dd MMMM yyyy" auto-apply placeholder="Tanggal Lahir" />
                                                            </div>
                                                        </div>
                                                    </div>										
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Jenis Kelamin</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-male"></i>
                                                                <b-form-select id="jk" v-model="user.jk" class="form-control" style="padding-left:40px;">
                                                                    <option value=null disabled>--Pilih Salah Satu--</option>
                                                                    <option value="Putra">Laki-Laki</option>
                                                                    <option value="Putri">Perempuan</option>
                                                                </b-form-select>													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Handphone / Whatsapp*</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fas fa-phone" style="font-size:medium;"></i></span>
                                                                <b-form-input id="telp" v-model="user.telp" type="number" class="form-control" placeholder="Nomor Kontak" />													
                                                            </div>
                                                        </div>
                                                    </div>										
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Pekerjaan</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-briefcase lock-icon"></i>
                                                                <b-form-input id="pekerjaan" v-model="user.pekerjaan" type="text" class="form-control" placeholder="Pekerjaan / Jabatan" />													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Sekolah/Tempat Kerja</label>
                                                            <div class="group-img">
                                                                <i class="fa fa-bank"></i>
                                                                <b-form-input id="satker" v-model="user.satker" type="text" class="form-control" placeholder="Tempat Bekerja" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-form-label">Alamat Lengkap</label>
                                                    <div class="pass-group group-img">
                                                        <textarea id="user.bio" v-model="user.alamat" rows="4" name="user.bio" class="form-control">{{user.bio}}</textarea>												
                                                    </div>
                                                </div>
                                                <div v-if="tid == 'team'" class="form-group">
                                                    <label class="col-form-label">Team Peserta</label>
                                                    <div class="pass-group group-img">
                                                        <i class="fas fa-male"></i>
                                                        <b-form-select id="team" v-model="user.team" class="form-control" style="padding-left:40px;">
                                                            <option value=1>Team 1</option>
                                                            <option v-for="n in parseInt(jtid-1)" :value=n+1>Team {{ n+1 }}</option>
                                                        </b-form-select>												
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div class="login-header">
                                                    <h3>DATA AKUN</h3>
                                                    <p>Digunakan Peserta untuk <span>LOGIN KE APLIKASI</span><br/><i style="font-size:smaller"> *Jika Diperlukan</i></p>								
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Email Address*</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-envelope"></i>
                                                                <b-form-input id="email" v-model="user.email" type="text" class="form-control" placeholder="Alamat Email" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Password*</label>
                                                            <div class="group-img">
                                                                <i class="feather-lock"></i>
                                                                <b-form-input id="password" v-model="user.password" type="password" class="form-control" placeholder="Password" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                        </div>
                                        <br>
                                        <div class="text-center">
                                        <b-button variant="primary" type="submit" :disabled="loadingpf"> 
                                            <span v-if="!loadingpf"><i class="fa fa-address-card" aria-hidden="true"></i>&nbsp; REGISTRASI </span>
                                            <span v-else><i-svg-spinners-bars-scale-middle />&nbsp; Mendaftarkan Dulu Gan...</span>
                                        </b-button>
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
            tid: this.$route.params.tid,
            jtid: this.$route.params.jtid,
            cid: this.$route.params.xid,
            gid: this.$route.params.id,
            title: "Registrasi Peserta MTQ",
            text: "Official",
            text1: "Registrasi",
            nama: "/",
			loading: false,
			loadingpf: false,
            kategori: [],
            cabang: [],
            user:{
                name: null,
                nama: null,
                nik: null,
                kk: null,
                tempat_lahir: null,
                tanggal_lahir: null,
                jk: null,
                telp: null,
                pekerjaan: null,
                satker: null,
                email: null,
                password: null,
                team: 1,
            }
        }
    },
  created() {
		window.scrollTo(0,0)
	},
  methods: {
        async updateProfil() {
			try{
				this.loadingpf = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/savePeserta',{
                    nama: this.user.name,
                    nik: this.user.nik,
                    kk: this.user.kk,
                    tempat_lahir: this.user.tempat_lahir,
                    tanggal_lahir: this.user.tanggal_lahir,
					telp: this.user.telp,
					pekerjaan: this.user.pekerjaan,
					jk: this.user.jk,
					satker: this.user.satker,
					alamat: this.user.alamat,
					email: this.user.email,
					password: this.user.password,
                    cid: this.cid,
                    gid: this.gid,
                    team: this.user.team,
				}, {headers})
				
				if(response.data.success == true){
					this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push({ path: "/registrasi" });
				}else if(response.data.success == false){
                    this.$swal.fire({
                        title: 'Registrasi Gagal',
                        html: response.data.message,
                        icon: 'error',
                    })
                }else{
                    let list=[];
                    $.each(response.data.valid, function(key, value) {
                        list.push(value+'<br/>');
                    });

                    this.$swal.fire({
                        title: 'Registrasi Gagal',
                        html: list.join(''),
                        icon: 'warning',
                    })
                }
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingpf = false
			}
		},

  }
}
</script>