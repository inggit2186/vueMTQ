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
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link to='/kontingen'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/LaporanKinerja.png'" style="width:100%;" alt="car1">
                                <h6>Verifikasi Peserta</h6>
                                <span>Verifikasi Data dan Dokumen Peserta MTQ</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link to='/slipgaji'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/516.png'" style="width:100%;" alt="car1">
                                <h6>Penilaian</h6>
                                <span>Input Penilaian Hasil MTQ</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link to='/listreq/777'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/777.png'" style="width:100%;" alt="car1">
                                <h6>Ranking</h6>
                                <span>Ranking atau Rekap Data Nilai Peserta MTQ</span>
                                </a>								   
                            </div>
                            </router-link>
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
            title: "Panitia Panel",
            text: "Home",
            text1: "Menu",
            name: "/",
            loading: false,
        };
    },
}
</script>