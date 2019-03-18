<template>
  <div id="app">

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
                  </div>
              </div>
          </nav>
        </header>
      </div>

    <router-view/>
    
    <footer class="footer">
        <!-- Copyright Bar -->
        <section class="copyright ptb-60">
                <div class="container">
                <!--Footer Info -->
                <div class="row footer-info">
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <div class="footer-block">
                            <a class="footer-logo mb-25" href="/">
                                <img src="dumbbell.png" />
                            </a>
                            <p>A workout app to track your sets and reps while also calculating your volume.</p>
                            <ul class="social">
                                <li><a target="_blank" href="https://www.twitter.com/"><i class="fa fa-twitter"></i></a></li>
                                <li><a target="_blank" href="https://instagram.com/"><i class="fa fa-instagram"></i></a></li>
                                <li><a target="_blank" href="https://www.facebook.com/"><i class="fa fa-facebook"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="footer-block">
                            <h6 class="link-title">Contact</h6>
                            <p>502, DieSachbearbeiter, Schönhauser Allee, 167c10435 Berlin,Germany.</p>
                            <ul class="link">
                                <li><a href="mailto:yourname@domain.com"><i class="fa fa-envelope-o left"></i>yourname@domain.com</a></li>
                                <li><a><i class="fa fa-phone left"></i>+40 (0) 012 345 6789</a></li>
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
