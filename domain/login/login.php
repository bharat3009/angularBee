
<!DOCTYPE html>
<html lang="en">
<title>Login</title>

<!-- Navigation -->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header page-scroll">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="javascript:;">HappeningBee</a>
        </div>
    </div>
    <!-- /.container-fluid -->
</nav>

<!-- Header -->
<header>
    <div class="container" >
        <div class="row">
            <div class="col-lg-6 col-lg-offset-3 " >
                <h2>Sign in with us</h2>

                <form name="sentMessage" id="sentMessage" ng-show = "loginform" novalidate>
                    <div class="row control-group" ng-ig = "loginform">
                        <div class="form-group  floating-label-form-group controls">
                            <label>User Name</label>
                            <input type="text" class="form-control" ng-model="username" placeholder="UserName"
                                   id="username" name="username" required>
                            <span style="color:red"
                                  ng-show="sentMessage.username.$dirty && sentMessage.username.$invalid">
  <span ng-show="sentMessage.username.$error.required">Username is required.</span>
  </span>
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group" ng-ig = "loginform">
                        <div class="form-group  floating-label-form-group controls">
                            <label>Password</label>
                            <input type="password" class="form-control" ng-model="password" placeholder="Password"
                                   id="password" name="password" required>
                            <span style="color:red"
                                  ng-show="sentMessage.password.$dirty && sentMessage.password.$invalid">
                            <span ng-show="sentMessage.password.$error.required">Password is required.</span>
                            </span>

                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <br>

                    <div id="success"></div>
                    <div class="row" ng-ig = "loginform">
                        <div class="form-group col-xs-12">
                            <input  type="submit" id="submit" class="btn-successonloginpage btn-lg" style="border: 2px solid #FFFF00 background-color: #FFFF00;" ng-click="myLogin()" value="Login"
                                    ng-disabled="sentMessage.username.$dirty && sentMessage.username.$invalid ||
  sentMessage.password.$dirty && sentMessage.password.$invalid" >
                        </div>
                    </div>
                    
                    <div class="row" ng-ig = "loginform">
                        <div class="form-group col-xs-12">
                            <input  type="submit" id="newusersubmit" class="btn-successonloginpage btn-lg" style="border: 2px solid #FFFF00 background-color: #FFFF00;" ng-click="newUserLogin()" value="New User SignIn"
                                    ng-disabled="sentMessage.username.$dirty && sentMessage.username.$invalid ||
  sentMessage.password.$dirty && sentMessage.password.$invalid" >
                        </div>
                    </div>
                    
                </form>
                
                 <div class="row control-group" ng-show = "areaSearch">
                    <div class="form-group  floating-label-form-group controls">
                            <label>Area / Region you want to bee</label>
                            <input type="text" id = "Autocomplete" class="form-control" ng-model="areaBarSearch" ng-autocomplete="areaBarSearch" options="options1" details="details1" placeholder="enter the area"
                                    name="areaBarSearch" required>
                            <span style="color:red"
                                  ng-show="areaBarSearch.$dirty && areaBarSearch.$invalid">
  <span ng-show="areaBarSearch.$error.required">area name  is required to show the hives.</span>
  </span>
                            <p class="help-block text-danger"></p>
                    </div>
                    <div class="row">
                        <div class="form-group col-xs-12">
                            <input  type="submit" id="goSearch" class="btn-successonloginpage btn-lg" style="border: 2px solid #FFFF00 background-color: #FFFF00;" ng-click="goSearch()" value="Go...."
                                    ng-disabled="areaBarSearch.$dirty && areaBarSearch.$invalid"  >
                        </div>
                    </div>
                
                </div>
                
                
                
                
            </div>
        </div>
    </div>
</header>
</html>