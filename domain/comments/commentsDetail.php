   <!DOCTYPE html>
<html lang="en">
<head>
    <title>History Detail</title>
</head>
<body id="page-top" class="index">
<!-- Navigation -->
<feedback-header></feedback-header>
<!-- Header -->
<!-- Contact Section -->
<section id="contact" style="height:600px">
    <div class="container">
        <br>
        <h4 style="text-align: center">History Detail</h4>

        <div class="bs-example">
            <div class="panel-group  col-md-4 col-md-offset-4" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <p style="font-size: 13px">Commented On {{commentsData.commentDate}}</p>
                        </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in" >
                        <div class="panel-body">
                            <div class="zoom_img" ng-show = "commentHasFile">
                                      <div id="myVideo"></div>
                            </div>
                            <p style="font-size: 14px"><b>Detail:</b>{{commentsData.commentsDetail}}</p>
                            <!--<p><img src="{{image}}" height="100px;" width="100px;" alt="No Image"></p>-->
                        </div>
                    </div>


                </div>
            </div>
        </div>

    
    
    <div style = "align : centre;" class="col-lg-6">
                <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. -->
                <!-- The form should work on most web servers, but if the form is not working you may need to configure your web server differently. -->
        <form method="post" enctype="multipart/form-data" name="sentMessage" id="sentMessage" novalidate>
            <br><br>

            <div class="row control-group">
                <div class="form-group col-xs-8 floating-label-form-group controls">
                    <label>Comment Here</label>
                    <textarea style = "color : #CCCC00" rows="2" class="form-control"  ng-model="commentarea" placeholder="comment here about your experience "
                              id="subCommentsData" name="subCommentsData" ng-init = "buttonshow = false" ng-change = "textchange()" required></textarea>

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
                <!--<input style = "background-color : #ffffcc;" type = "checkbox" ng-model = "showMyName" ng-true-value = 'Y' ng-false-value = "N">
                    <label>Show my Name</label>-->

            </div>
        </form>





         <div class = "panel-group">
            <ul>
                <li  ng-repeat = "comment in commentsDataOne">
                        <div class = "panel panel-default">

                            <div class = "panel-body">{{comment.commentDate}} <br><br> {{comment.commentsDetail}} <br></div>
                            <img src='{{commentsData.filepath}}' height="100px;" width="100px;" alt="No Image">

                            <div style = "color : #cccc00 padding-bottom : 1px" class = "panel-footer">
                                <button  type="button" class="btn btn-primaryonhome btn-xs" ng-class = "{likeactive : comment.agreed }" ng-click="liked($index)" >
                                                like
                                </button>{{comment.agreeCount}} &nbsp; &nbsp; &nbsp; &nbsp
                                <button   type="button" class="btn btn-primaryonhome" ng-class = "{likeactive : comment.notAgreed }" ng-click = "disliked($index)" >dislike
                                </button>{{comment.notAgreeCount}} &nbsp; &nbsp; &nbsp; &nbsp


                            </div>
                        </div>
                        <br><br>
                        <p>   </p>
                    </li>

                    <br>
                </ul>
            </div>
     </div>
        
</div>
</section>

<!-- Footer -->
</body>
</html>
