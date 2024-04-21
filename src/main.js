/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import { router } from './router';
import App from "./App.vue";
import {BootstrapVue3, BToastPlugin} from 'bootstrap-vue-3';
import VueApexCharts from "vue3-apexcharts";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import VueEasyLightbox from "vue-easy-lightbox";
import Antd from 'ant-design-vue';
import AOS from 'aos'
import VueCarousel from 'vue-carousel';
import axios from 'axios';
import Swal from 'sweetalert2';
import StarRating from 'vue-star-rating'
import pdfjsLib from 'pdfjs-dist'
import VueDatePicker from '@vuepic/vue-datepicker';
import VueCryptojs from 'vue-cryptojs';
import VueSignaturePad from 'vue-signature-pad';
import bottomNavigationVue from "bottom-navigation-vue";

// Header Components
import Navbar from './components/navbar.vue'
import UserNavbar from './components/UserpageNavbar.vue'
import NavbarTwo from './components/navbarTwo.vue'
import NavbarTwoHeader from './components/navbarTwoHeader.vue'
import NavbarThree from './components/navbarThree.vue'
import NavbarFour from './components/navbarFour.vue'
import NavbarFive from './components/navbarFive.vue'
import NavMenu from './components/navmenu.vue'
import userMenu from './components/userMenu.vue'
import kinerjaMenu from './components/kinerjaMenu.vue'

// Page Components
import Header from './views/layouts/header.vue'
import IndexExplore from './views/pages/index/IndexExplore.vue'
import IndexCategory from './views/pages/index/IndexCategory.vue'
import Indexfeatured from './views/pages/index/IndexFeatured.vue'
import IndexPopular from './views/pages/index/IndexPopular.vue'
import IndexAds from './views/pages/index/IndexAds.vue'
import IndexCta from './views/pages/index/IndexCTA.vue'
import IndexClient from './views/pages/index/IndexClient.vue'
import IndexPartners from './views/pages/index/IndexPartners.vue'
import IndexPricing from './views/pages/index/IndexPricing.vue'
import IndexBlog from './views/pages/index/IndexBlog.vue'
import Foot from './views/pages/Footer.vue'
import Scroll from './views/pages/Scroll.vue'
import AboutContent from './views/pages/about/AboutContent.vue'
import AboutPopular from './views/pages/about/AboutPopular.vue'
import AboutPartners from './views/pages/about/AboutPartners.vue'
import AddListing from './views/pages/add-listing/AddListing.vue'
import ContactInfo from './views/pages/contact/ContactInformation.vue'
import FaqContent from './views/pages/faq/FaqContent.vue'
import ForgotPassword from './views/pages/forgot-password/ForgotPassword.vue'
import HowWorks from './views/pages/howitworks/Works.vue'
import HowItPricing from './views/pages/howitworks/Pricing.vue'
import LoginForm from './views/pages/Login/LoginForm.vue'
import PrivacyPolicy from './views/pages/privacy-policy/PrivacyTerms.vue'

import SignupLogin from './views/pages/signup/SignupLogin.vue'
import TermsContent from './views/pages/terms-conditions/TermsContent'
import IndexWedding from './views/pages/indextwo/indexwedding.vue'
import IndexCelebrate from './views/pages/indextwo/indexCelebrate.vue'
import IndexVendor from './views/pages/indextwo/indexVendor.vue'
import IndexPackage from './views/pages/indextwo/indexPackage.vue'
import IndexPortfolio from './views/pages/indextwo/indexPortfolio.vue'
import IndexTimeline from './views/pages/indextwo/indexTimeline.vue'
import WeddingIndexBlog from './views/pages/indextwo/indexBlog.vue'
import IndexAppointment from './views/pages/indextwo/indexAppointment.vue'
import WeddingFooter from './views/pages/indextwo/footer/footer.vue'

import IndexHome from './views/pages/home/indexHome.vue'
import IndexThreeDestination from './views/pages/home/indexDestination.vue'
import IndexOffer from './views/pages/home/indexOffer.vue'
import IndexPromo from './views/pages/home/indexPromo.vue'
import IndexTestimonial from './views/pages/home/indexTestimonial.vue'
import IndexPrice from './views/pages/home/indexPrice.vue'
import IndexSubscribe from './views/pages/home/indexSubscribe.vue'
import IndexActivity from './views/pages/home/indexActivity'
import IndexDesc from './views/pages/home/IndexDesc.vue'
import NavThreeFooter from './views/pages/home/footer.vue'

import IndexNow from './views/pages/indexfour/indexNow.vue'
import IndexCowork from './views/pages/indexfour/indexCowork.vue'
import IndexSpace from './views/pages/indexfour/indexSpace.vue'
import IndexFourClient from './views/pages/indexfour/indexFourClient.vue'
import IndexFourPricing from './views/pages/indexfour/indexFourPricing.vue'
import IndexFourBlog from './views/pages/indexfour/indexFourBlog.vue'
import IndexFourFooter from './views/pages/indexfour/footer.vue'
import RecommendSlide from './views/pages/home/recommendSlide.vue'
import NextTripSlide from './views/pages/home/nextTripSlide.vue'

import IndexDiscover from './views/pages/indexfive/indexDiscover.vue'
import IndexBusiness from './views/pages/indexfive/indexBusiness.vue'
import IndexFiveSpace from './views/pages/indexfive/indexSpace.vue'
import IndexFiveClient from './views/pages/indexfive/indexClient.vue'
import IndexFiveFooter from './views/pages/indexfive/footer.vue'

//profil
import Dashboard from './views/pages/dashboard/DashboardContent.vue'
import ProfileDashboard from './views/pages/profile/ProfileDashboard.vue'
import ReviewDashboard from './views/pages/reviews/ReviewDashboard.vue'
import JanjiTemu from './views/pages/profile/JanjiTemu.vue'
import UserData from './views/pages/profile/UserData.vue'
import KegiatanHarian from './views/pages/profile/KegiatanHarian.vue'
import LaporanKinerja from './views/pages/profile/LaporanKinerja.vue'
import KinerjaBawahan from './views/pages/profile/KinerjaBawahan.vue'
import slipGajix from './views/pages/profile/SlipGajix.vue'

//MTQ
import cabangMTQ from './views/pages/cabang/cabangMTQ.vue'
import golonganMTQ from './views/pages/cabang/golonganMTQ.vue'
import pesertaMTQ from './views/pages/cabang/pesertaMTQ.vue'
import regPeserta from './views/pages/peserta/regPeserta.vue'
import registrasiData from  './views/pages/peserta/registrasiData.vue'
import berkasPeserta  from './views/pages/peserta/berkasPeserta.vue'

//cPanel
import adminMenu from './views/pages/adminpanel/adminMenu.vue'
import kontingenList from  './views/pages/adminpanel/kontingenList.vue'
import pesertaList from   './views/pages/adminpanel/pesertaList.vue'
import listRequest from './views/pages/adminpanel/listRequest.vue'
import detailRequest from './views/pages/adminpanel/detailRequest.vue'
import verifCKH from './views/pages/adminpanel/LaporanKinerja.vue'
import adminSatker from './views/pages/adminpanel/SatuanKerja.vue'
import listSatker from './views/pages/adminpanel/ListSatker.vue'
import rekapKinerja from './views/pages/adminpanel/RekapKinerja.vue'
import allRekapKinerja from './views/pages/adminpanel/allRekapKinerja.vue'
import slipGaji from './views/pages/adminpanel/SlipGaji.vue'

// Breadcrumbs 
import BreadCrumb from './components/breadcrumb/Component.vue'
import AboutBreadcrumb from './components/breadcrumb/AboutBreadcrumb.vue'

// plugins
// import './assets/js/map.js'
import 'aos/dist/aos.css'
import './assets/js/backToTop.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'ant-design-vue/dist/antd.css';
import './assets/css/feather.css';
import './assets/css/style.css';
import '@vuepic/vue-datepicker/dist/main.css';
import "bottom-navigation-vue/dist/style.css";

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
const assetSrc = new URL(`${window.location.origin}/v2/assets`, import.meta.url).href;

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$toast = Toast;
app.config.globalProperties.$assets = assetSrc;
app.component('Layouts',Header)
app.component('Navbar',Navbar)
app.component('Usernavbar',UserNavbar)
app.component('Navbartwo',NavbarTwo)
app.component('NavbartwoHeader',NavbarTwoHeader)
app.component('Navbarthree',NavbarThree)
app.component('Navbarfour',NavbarFour)
app.component('Navbarfive',NavbarFive)
app.component('Navmenu',NavMenu)
app.component('UserMenu',userMenu)
app.component('KinerjaMenu',kinerjaMenu)

app.component('Indexcategory',IndexCategory)
app.component('Indexexplore',IndexExplore)
app.component('Indexfeatured',Indexfeatured)
app.component('Indexpopular',IndexPopular)
app.component('Indexads',IndexAds)
app.component('Indexcta',IndexCta)
app.component('Indexclient',IndexClient)
app.component('Indexpartners',IndexPartners)
app.component('Indexpricing',IndexPricing)
app.component('Indexblog',IndexBlog)
app.component('Foot',Foot)
app.component('Scroll',Scroll)
app.component('Aboutcontent',AboutContent)
app.component('Aboutpopular',AboutPopular)
app.component('Aboutpartners',AboutPartners)
app.component('Addlisting',AddListing)
app.component('Contactinformation',ContactInfo)
app.component('Faqcontent',FaqContent)
app.component('Forgotpassword',ForgotPassword)
app.component('Howworks',HowWorks)
app.component('Howitpricing',HowItPricing)
app.component('Loginform',LoginForm)
app.component('Privacypolicy',PrivacyPolicy)
app.component('Signuplogin',SignupLogin)
app.component('Termscontent',TermsContent)
app.component('Indexwedding',IndexWedding)
app.component('Indexcelebrate',IndexCelebrate)
app.component('Indexvendor',IndexVendor)
app.component('Indexpackage',IndexPackage)
app.component('Indexportfolio',IndexPortfolio)
app.component('Indextimeline',IndexTimeline)
app.component('Weddingindexblog',WeddingIndexBlog)
app.component('Indexappointment',IndexAppointment)
app.component('Weddingfooter',WeddingFooter)

app.component('Indexhome',IndexHome)
app.component('IndexDesc',IndexDesc)
app.component('Indexthreedestination',IndexThreeDestination)
app.component('Indexoffer',IndexOffer)
app.component('Indexpromo',IndexPromo)
app.component('Indextestimonial',IndexTestimonial)
app.component('Indexprice',IndexPrice)
app.component('Indexsubscribe',IndexSubscribe)
app.component('Indexactivity',IndexActivity)
app.component('Navbarthreefooter',NavThreeFooter)

app.component('Indexnow',IndexNow)
app.component('Indexcowork',IndexCowork)
app.component('Indexspace',IndexSpace)
app.component('Indexfourclient',IndexFourClient)
app.component('Indexfourblog',IndexFourBlog)
app.component('Indexfourfooter',IndexFourFooter)
app.component('Recommendslide',RecommendSlide)

app.component('Nexttripslide',NextTripSlide)

app.component('Indexdiscover',IndexDiscover)
app.component('Indexbusiness',IndexBusiness)
app.component('Indexfivespace',IndexFiveSpace)
app.component('Indexfiveclient',IndexFiveClient)
app.component('Indexfivefooter',IndexFiveFooter)

//MTQ
app.component('cabangMTQ',cabangMTQ)
app.component('golonganMTQ',golonganMTQ)
app.component('pesertaMTQ',pesertaMTQ)
app.component('regPeserta',regPeserta)
app.component('registrasiData',registrasiData)
app.component('berkasPeserta',berkasPeserta)

//cPanel
app.component('AdminMenu', adminMenu)
app.component('kontingenList', kontingenList)
app.component('pesertaList', pesertaList)
app.component('ListRequest', listRequest)
app.component('DetailRequest', detailRequest)
app.component('VerifCKH',verifCKH)
app.component('adminSatker',adminSatker)
app.component('ListSatker',listSatker)
app.component('RekapKinerja',rekapKinerja)
app.component('AllRekapKinerja',allRekapKinerja)
app.component('SlipGaji',slipGaji)

// Breadcrumb
app.component('Breadcrumb',BreadCrumb)
app.component('Aboutbreadcrumb',AboutBreadcrumb)
app.component('VueDatePicker',VueDatePicker)

.use(BootstrapVue3)
.use(BToastPlugin)
.use(Antd)
.use(AOS.init())
app.use(VueEasyLightbox);
app.use(VueSignaturePad);
app.use(bottomNavigationVue);
app.use(pdfjsLib);
app.use(VueCryptojs);
app.use(CoolLightBox);
app.use(VueApexCharts);
app.use(VueCarousel);
app.use(router).mount('#app');