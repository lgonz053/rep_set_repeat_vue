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
  min-height: 650px;
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
