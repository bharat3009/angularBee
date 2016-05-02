<feedback-header></feedback-header>

<!-- Contact Section -->

<section id="contact">
    <div class="container">
        <br><br>
        <div style = "width :100% position : absolute" class="btn-group btn-block" ng-init = "homeshowpar = true" >
            <button type="button" class="btn btn-primaryonhome col-lg-4" ng-click = homeshow()>Local Hives</button>
            <button type="button" class="btn btn-primaryonhome col-lg-4" ng-click = historyshow()>My Hives</button>
            <button type="button" class="btn btn-primaryonhome col-lg-4" ng-click = globalshow()>Global Hives</button> 
        </div>
        <script>

            function responseVideo() {
                //var a = document.this
                this.get(0).play();
            }
        </script>
        
        <div class="row" ng-show = "homeshowpar">
            <div style = "align : centre;" class="col-lg-8">
                <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. -->
                <!-- The form should work on most web servers, but if the form is not working you may need to configure your web server differently. -->
                <form method="post" enctype="multipart/form-data" name="sentMessage" id="sentMessage" novalidate>
                    <br><br>

                    <div class="row control-group">
                        <div class="form-group col-xs-8 floating-label-form-group controls">
                            <label>Comment Here</label>
                            <textarea style = "color : #CCCC00" rows="2" class="form-control"  ng-model="commentarea" placeholder="comment here about your experience "
                                      id="commentsData" name="commentsData"  ng-change = "textchange()" required></textarea>

                            <p class="help-block text-danger"></p>
                        </div>

                    </div>
                    <br>
                    <div ng-show = "buttonshow">
                            <button style = " background-color: #ffffcc;" type="file" ngf-select="uploadFiles($file, $invalidFiles)" id="submitClick"
                                accept="image/*,video/*" ngf-max-height="1000" ngf-max-size="10MB" class="btn btn-primaryonhome btn-xs">
                            Browse File
                            </button>

                            <br><br>

                            <div style="font:smaller">{{f.name}} {{errFile.name}} {{errFile.$error}} {{errFile.$errorParam}}
                            <span class="progress" ng-show="f.progress >= 0">
                               <div style="width:{{f.progress}}%"
                                    ng-bind="f.progress + '%'"></div>
                            </span>
                            </div>
                                {{errorMsg}}
                    <!--</form>-->
                            <br>
                            <br>

                            <div id="success"></div>
                            <button style = " background-color: #ffffcc;" id="submitBtnClick" type="submit" class="btn btn-primaryonhome btn-xs" name="submit" ng-click="submitData()">Submit</button>
                            <button style = " background-color: #ffffcc;" type="reset" ng-click="reset()" class="btn btn-primaryonhome btn-xs">Reset</button>
                            <input style = "color : #ffffcc;" type = "checkbox" ng-model = "showMyNameFlag" ng-init = "showMyNameFlag = true" ng-click = "showNameCheckBox()" required>{{showMyNameFlag}}</input>
                                <label>Show my Name</label>
                        </div>
                </form>
            </div>
            
           
        </div>
    </div>
    <div class="container col-lg-6">
        <br>
        <hr>

<!--
        <h4 style="text-align: center;font-size:25px">History List</h4>
-->

        <hr>
        <div class=" col-md-6">
            <input type="text" name="search" class="form-control" id="mysearch" autocomplete="off" spellcheck="false"
                   placeholder="search here">
        </div>
        
         <div class=" col-md-6">
            <input type="text" name="asearch" class="form-control" id="areasearch" autocomplete="off" spellcheck="false"
                   placeholder="areaa search">
        </div>
        <br>
       <!-- <div class="clearfix"></div>-->
        <hr>
    
     
        <div class = "panel-group">
        <ul>
            <li  ng-repeat = "comment in commentsDataOne">
                <div class = "panel panel-default">
                    
                    <div style = " align : right background-color: #ffff00; color : #cccc00" class = "panel-body" ng-if = "comment.showNameFlag = 'Y'"><b>{{comment.userName}} </b></div>
                    <div>{{comment.commentsDetail}} <br></div><br>
                    <img style = "horizontal-align : center" src="{{comment.filepath}}" height="300px;" width="200px;" alt="No Image">
                    <div style = "color : #cccc00 padding-bottom : 1px" class = "panel-footer">
                        <button  type="button" class="btn btn-primarylike btn-xs" ng-class = "{likeactive : comment.agreed }" ng-click="liked($index)" >
                            <img src="images/B01.png" >
                                        
                        </button>{{comment.agreeCount}} &nbsp; &nbsp; &nbsp; &nbsp
                        <button   type="button" class="btn btn-primarylike btn-xs" ng-class = "{likeactive : comment.notAgreed }" ng-click = "disliked($index)" >
                            <img src="images/B04.png" >
                        </button>{{comment.notAgreeCount}} &nbsp; &nbsp; &nbsp; &nbsp
                        <a style = " align : right background-color: #ffff00; color : #cccc00"  href = "#/commentsDetail?commentId={{comment.commentId}}"  >{{comment.commentsCount}} comments</a>&nbsp; &nbsp;{{comment.commentDate}}
                                             
                    </div>
                </div>
                <br><br>
                 <p>   </p>
            </li>
           
            <br>
        </ul>
        </div>
        
        
    </div>

</section>


