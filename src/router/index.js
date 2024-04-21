import {createRouter, createWebHistory} from 'vue-router';
import Swal from 'sweetalert2';

import Index from '../views/pages/index/index.vue'
import About from '../views/pages/about/about.vue'
import Contact from '../views/pages/contact/Contact.vue'
import Dashboard from '../views/pages/dashboard/Dashboard.vue'
import Error404 from '../views/pages/Error/error404/Error404.vue'
import Error500 from '../views/pages/Error/error500/Error500.vue'
import Faq from '../views/pages/faq/Faq.vue'
import ForgotPass from '../views/pages/forgot-password/Password.vue'
import HowItWorks from '../views/pages/howitworks/HowitWorks.vue'
import LoginPage from '../views/pages/Login/Login.vue'

import Privacy from '../views/pages/privacy-policy/PrivacyPolicy.vue'
import Profiles from '../views/pages/profile/Profile.vue'
import Reviews from '../views/pages/reviews/Review.vue'
import SignUp from '../views/pages/signup/Signup.vue'
import TermsAndConditions from '../views/pages/terms-conditions/TermsConditions.vue'
import IndexTwo from '../views/pages/indextwo/indexTwo.vue'
import IndexThree from '../views/pages/home/indexTemplate.vue'
import IndexFour from '../views/pages/indexfour/indexFour.vue'
import IndexFive from '../views/pages/indexfive/indexFive.vue'

//profil
import JanjiTemu from '../views/pages/profile/JanjiTemu.vue'
import UserData from '../views/pages/profile/UserData.vue'
import KegiatanHarian from '../views/pages/profile/KegiatanHarian.vue'
import LaporanKinerja from '../views/pages/profile/LaporanKinerja.vue'
import KinerjaBawahan from '../views/pages/profile/KinerjaBawahan.vue'
import slipGajix from '../views/pages/profile/SlipGajix.vue'

//MTQ
import cabangMTQ from '@/views/pages/cabang/cabangMTQ.vue';
import golonganMTQ from '@/views/pages/cabang/golonganMTQ.vue';
import pesertaMTQ from '@/views/pages/cabang/pesertaMTQ.vue';
import regPeserta from '@/views/pages/peserta/regPeserta.vue';
import registrasiData from '@/views/pages/peserta/registrasiData.vue';
import berkasPeserta from '@/views/pages/peserta/berkasPeserta.vue';

//cPanel
import AdminMenuVue from '@/views/pages/adminpanel/adminMenu.vue'
import kontingenList from '@/views/pages/adminpanel/kontingenList.vue';
import pesertaList from '@/views/pages/adminpanel/pesertaList.vue';
import ListRequestVue from '@/views/pages/adminpanel/listRequest.vue'
import DetailRequestVue from '@/views/pages/adminpanel/detailRequest.vue'
import VerifCKH from '@/views/pages/adminpanel/LaporanKinerja.vue'
import adminSatker from '@/views/pages/adminpanel/SatuanKerja.vue'
import rekapKinerja from '@/views/pages/adminpanel/RekapKinerja.vue'
import allRekapKinerja from '@/views/pages/adminpanel/AllRekapKinerja.vue'
import slipGaji from '@/views/pages/adminpanel/SlipGaji.vue'

const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexThree
    },
    {
        path: '/cabangmtq/:id',
        name: 'CabangMTQ',
        component: cabangMTQ
    },
    {
        path: '/cabangmtq/:xid/:id',
        name: 'golonganMTQ',
        component: golonganMTQ
    },
    {
        path: '/cabangmtq/info/:tid/:jtid/:xid/:id',
        name: 'Peserta MTQ',
        component: pesertaMTQ
    },
    {
        path: '/cabangmtq/:nid/:tid/:jtid/:xid/:id',
        name: 'pesertaMTQ',
        component: registrasiData,
        meta: {
            requiresOfficial: true
          }
    },
    {
        path: '/registrasi',
        name: 'Registrasi Peserta',
        component: regPeserta,
        meta: {
            requiresOfficial: true
          }
    },
    {
        path: '/cabangmtq/reg/pesertafiles/upload/:id',
        name: 'Berkas Peserta',
        component: berkasPeserta,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/contact',
        name: 'Kontak Kami',
        component: Contact
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/error-404',
        name: 'error-404',
        component: Error404
    },
    {
        path: '/error-500',
        name: 'error-500',
        component: Error500
    },
    {
        path: '/faq',
        name: 'faq',
        component: Faq
    },
    {
        path: '/forgot-password',
        name: 'Password',
        component: ForgotPass
    },
    {
        path: '/howitworks',
        name: 'howitworks',
        component: HowItWorks
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/user-appointment',
        name: 'User Appointment',
        component: JanjiTemu,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: Privacy
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profiles,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/kinerja-harian',
        name: 'Kinerja Harian',
        component: KegiatanHarian,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/laporankinerja',
        name: 'Laporan Kinerja',
        component: LaporanKinerja,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/kinerjabawahan',
        name: 'Kinerja Bawahan',
        component: KinerjaBawahan,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/userdata',
        name: 'Data Pegawai',
        component: UserData,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/cashbon',
        name: 'Personal Cashbon',
        component: slipGajix,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/reviews',
        name: 'Reviews',
        component: Reviews,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/admin',
        name: 'Admin Panel',
        component: AdminMenuVue,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/kontingen',
        name: 'Daftar Kontingen',
        component: kontingenList,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/kontingen/verif/:id',
        name: 'Daftar Peserta',
        component: pesertaList,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/listreq/:id',
        name: 'Daftar Request',
        component: ListRequestVue,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/detailrequest/:id',
        name: 'Detail Request',
        component: DetailRequestVue,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/verifckh',
        name: 'Laporan CKH',
        component: VerifCKH,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/verifckh/:xid/:id',
        name: 'Verifikasi CKH',
        component: adminSatker,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/ckh/:xid/:id',
        name: 'Rekap CKH',
        component: rekapKinerja,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/slipgaji',
        name: 'Slip Gaji',
        component: slipGaji,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/allRekapKinerja/:id',
        name: 'All Rekap CKH',
        component: allRekapKinerja,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignUp
    },
    {
        path: '/terms-condition',
        name: 'terms-condition',
        component: TermsAndConditions
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            userLogout: true
          }
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: Error404
    }
   

]
export const router = createRouter({
    history: createWebHistory('/emtq'),
    linkActiveClass: 'active',
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
       // Check if the user is logged in
       if (localStorage.getItem('user')) {
         next();
       } else {
         next({
           path: '/login',
           query: { redirect: to.fullPath }
         });
       }
    }else if (to.matched.some(record => record.meta.requiresAdmin)) {
        // Check if the user is logged in
        if (localStorage.getItem('user')) {
            let userData = JSON.parse(localStorage.getItem("user"));
            if(userData.rtoken == "1956kokciis3495" || userData.rtoken == '1456mdkjf898'){
                next()
            }else{
                Swal.fire({
                    title: ':: Restricted Area ::',
                    text: 'Anda Tidak Memiliki Akses ke Bagian Ini !!',
                    icon: 'error',
                })
                next({
                    path: '/',
                  });
            }
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        }
     }else if (to.matched.some(record => record.meta.requiresOfficial)) {
        // Check if the user is logged in
        if (localStorage.getItem('user')) {
            let userData = JSON.parse(localStorage.getItem("user"));
            if(userData.rtoken == "5659cmzxkc5651" || userData.rtoken == "1956kokciis3495"){
                next()
            }else{
                Swal.fire({
                    title: ':: Restricted Area ::',
                    text: 'Anda Tidak Memiliki Akses ke Bagian Ini !!',
                    icon: 'error',
                })
                next({
                    path: '/',
                  });
            }
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        }
     }else if (to.matched.some(record => record.meta.userLogout)) {
        
        localStorage.clear()
        next({
            path: '/login',
          });
     } else {
       next();
    }
   });

