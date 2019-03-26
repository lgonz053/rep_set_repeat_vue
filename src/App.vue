<template>
  <div id="app">
    <div class="sidebar-menu">
        <div class="sidembar-menu-wrap">
            <a href="javascript:void(0)" class="sidebar-close-icon icon--close">
                <i class="ion ion-android-close"></i>
            </a>
            <!--Sidebar Content-->
            <div class="sidebar-content">
                <ul>
                    <li><router-link to="/">Workouts</router-link></li>
                    <li><router-link to="/workouts/new">New Workout</router-link></li>       
                    <li><router-link to="/exercises/new">New Exercise</router-link></li>
                    <li><router-link to="/login">Login</router-link></li>
                    <li><router-link to="/logout">Logout</router-link></li>
                    <li><router-link to="/signup">Sign Up</router-link></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="wrapper">
      <header id="header" class="header-transparent header--sticky header--dark" style="min-height: 84px;">
          <nav id="navigation" class="header-nav">
              <div class="container">
                  <div class="row d-flex flex-md-row align-items-center">
                      <div class="nav-menu ml-auto">
                          <ul class="">
                              <li class="nav-menu-item">
                                  <router-link to="/">Workouts</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="/workouts/new">New Workout</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="/exercises/new">New Exercise</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="/login">Login</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="/logout">Logout</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="/signup">Sign Up</router-link>
                              </li>
                          </ul>
                      </div>

                          <div class="nav-icons">
                              <div class="nav-icon-item d-lg-none">
                                  <span class="nav-icon-trigger menu-mobile-btn align-middle"><i class="ion"></i></span>
                              </div>

                              <div class="nav-icon-item">
                                  <span class="nav-icon-trigger sidebar-menu_btn align-middle"><i class="ion ion-navicon"></i></span>
                              </div>
                          </div>
                  </div>
              </div>
          </nav>
        </header>
      </div>

    <section id="intro">
        <!-- Hero Slider Section -->
        <div class="flexslider fullscreen-carousel hero-slider-1 ">
            <ul class="slides">

                <!--Slide-->
                <li data-slide="dark-slide">
                    <div class="slide-bg-image overlay-light parallax parallax-section1" data-background-img="img/barbell.png">
                        <div class="js-Slide-fullscreen-height container">
                            <div class="intro-content">
                                <div class="intro-content-inner">
                                    <h2 class="h2">Welcome to Rep Set Repeat</h2>
                                    <p class="lead">“There are no shortcuts—everything is reps, reps, reps.” - Arnold Schwarzenegger</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <!--Slide-->
                <li data-slide="light-slide">
                    <div class="slide-bg-image overlay-dark dark-bg parallax parallax-section1" data-background-img="img/dark-dumbbell.jpg">
                        <div class="js-Slide-fullscreen-height container">
                            <div class="intro-content">
                                <div class="intro-content-inner">
                                    <h2 class="h2">“If I have to die tonight, if this weight is going to kill me tonight then so be it, I am dying where I wanna be.”</h2>
                                    <p class="lead">- Kai Greene</p>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <!--Slide-->
                <li data-slide="dark-slide">
                    <div class="slide-bg-image overlay-light parallax parallax-section1" data-background-img="img/dark-equipment.jpg">
                        <div class="js-Slide-fullscreen-height container">
                            <div class="intro-content">
                                <div class="intro-content-inner">
                                    <h2 class="h2">"I always say to myself right before a tough set in the gym, Ain't nothin' to it, but to do it."</h2>
                                    <p class="lead">- Ronnie Coleman</p>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- End Hero Slider Section -->
    </section>

    <div class='clearfix'>
      <router-view/>
    </div>
    
    <footer class="footer">
        <!-- Copyright Bar -->
        <section class="copyright ptb-60">
                <div class="container">
                <!--Footer Info -->
                <div class="row footer-info">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="footer-block">
                            <h6 class="link-title">Created By:</h6>
                            <p>Leo Gonzalez</p>
                            <ul class="link">
                                <li><a href="https://www.linkedin.com/in/leogonz"><i ></i>My linkedin can be found here!</a></li>
                                <li><a href="https://github.com/lgonz053"><i></i>My Github handle is: lgonz053!</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- End Footer Info -->
            </div>
        </section>
        <!-- End Copyright Bar -->

    </footer>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.clearfix{
  min-height: 700px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
