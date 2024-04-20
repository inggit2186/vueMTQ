<template>
		<!-- Success Section -->
		<section class="success-section">
		    <div class="container">
			    <div class="row align-items-center">
			        <div class="col-md-5 aos" data-aos="fade-up">
						<div class="success-img">
							<img src="../../../assets/img/success-img.png" class="img-fluid" alt="img">
						</div>	
					</div>	
					<div class="col-md-7 aos" data-aos="fade-up">
						<div class="success-wrap">
							<div class="section-heading-two text-center">
								<p>Aparatus Sipil Negara Kankemenag Kab.Tanah Datar</p>
								<h2>MAKLUMAT PELAYANAN</h2>
								<img src="../../../assets/img/title-img.png" class="img-fluid" alt="title-img">
							</div>		
							<div class="success-sec">
								<div class="row justify-content-center">
									<div data-aos="fade-up">
										<div class="success-item">
											<div class="centered"><span style="font-size: 55px;"><i-mingcute-announcement-line /></span>
											<h6>Kami Seluruh Aparatur Kantor Kementerian Agama Kabupaten Tanah Datar</h6>
											<h6>Dengan Ini Menyatakan</h6></div>
                                            <hr/>
											<p>1. Sanggup Menyelenggarakan Pelayanan Sesuai dengan Standar Pelayanan yang ditetapkan</p>
											<p>2. Akan Memberikan Pelayanan Sesuai dengan Kewajiban</p>
											<p>3. Akan Melakukan Perbaikan secara Terus Menerus</p>
											<p>4. Bersedia Menerima Sanksi Sesuai Ketentuan yang Berlaku, Apabila Pelayanan yang Kami Berikan Tidak Sesuai Standar.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<hr/>
					<div class="col-md-7 aos centered" data-aos="fade-up" style="margin-top: 60px;">
						<div>
							<img src="../../../assets/img/grafitikasi.png" style="width:100%;"/>
						</div>
					</div>
				</div>			   
			</div>		
		</section>
		<!-- /Celebrating Section -->
</template>

<script>
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexTwoFeedback from '../../../assets/json/indexTwoFeedback.json';

export default {
	components: {
			Carousel,
			Slide,
			Pagination,
			Navigation,
		},
    data() {
        return {
            IndexTwoFeedback: [],
			total: null,
            settings: {
				itemsToShow: 1,
				snapAlign: "center"
			},
			breakpoints: {
                575: {
					itemsToShow: 2,
					snapAlign: "center"
				},
				// 700px and up
				767: {
					itemsToShow: 2,
					snapAlign: "center"
				},
                // 991 and up
                991: {
                    itemsToShow: 3,
					snapAlign: "center"
                },
				// 1024 and up
				1024: {
					itemsToShow: 3,
					snapAlign: "start"
				}
			},
        }
    },
	created() {
		window.scrollTo(0,0)
	},
}
</script>

<style>
.carousel__item {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 24px;
}
.grid-blog{
    margin-right: 24px;
}
</style>