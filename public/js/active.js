

(function ($) {
    'use strict';

    var browserWindow = $(window);

    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {
        $('.preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: 2.0 Nav Active Code
    if ($.fn.classyNav) {
        $('#magNav').classyNav();
    }

    // :: 3.0 Sticky Active Code
    if ($.fn.sticky) {
        $("#sticker").sticky({
            topSpacing: 0
        });
    }

    // :: 4.0 Sliders Active Code
    if ($.fn.owlCarousel) {

        var welcomeSlides = $('.hero-area');

        welcomeSlides.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });

        welcomeSlides.on('translate.owl.carousel', function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        welcomeSlides.on('translated.owl.carousel', function () {
            var slideLayer = welcomeSlides.find('.owl-item.active').find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        $('.trending-post-slides').owlCarousel({
            items: 3,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1500: {
                    items: 3
                }
            }
        });

        $('.featured-video-posts-slide').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000
        });

        $('.most-viewed-videos-slide').owlCarousel({
            items: 3,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1500: {
                    items: 3
                }
            }
        });

        $('.sports-videos-slides').owlCarousel({
            items: 2,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 1
                },
                1500: {
                    items: 2
                }
            }
        });
    }

    // :: 5.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="ti-angle-up"></i>'
        });
    }

    // :: 6.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: 7.0 Prevent Default a Click
    $('a[href="#"]').on('click', function (e) {
        e.preventDefault();
    });

    // $('#submitPostArticleButton').on('click', function (e) {

    //     var title         = $("#title").val(),
    //     postContent           = $('#summernote').summernote('code'),  
    //     postType              = "article",
    //     postUserImg           = $("#postUserImg").val(),
    //     sampleFile            = $("#sampleFile").get(0).files;


    // var postData = {
    //   title:title,
    //   postContent:postContent,
    //   postType:postType,
    //   postUserImg:postUserImg,
    //   sampleFile:sampleFile     
    // }

    // // console.log(blogTitle + " --- " + blogSubTitle + " --- " + comImage + " --- " + blog);


    // $.ajax({
    //     type: "POST",
    //     url: "/addPost",
    //     enctype: 'multipart/form-data',
    //     data: JSON.stringify({postData:postData}),
    //     success: function () {
    //         alert("Data Uploaded: ");
    //     }
    // });
    // });

    // var title         = $("#title").val(),
    //     postContent       = $('#summernote').summernote('code'),  
    //     postType          = "article",
    //     postUserImg       = $("#postUserImg").val(),
    //     postSmImg         = $("#postSmImg").val();


    // var postData = {
    //   title:title,
    //   postContent:postContent,
    //   postType:postType,
    //   postUserImg:postUserImg,
    //   postSmImg:postSmImg
    // }

    // // console.log(blogTitle + " --- " + blogSubTitle + " --- " + comImage + " --- " + blog);

    // $.post('addPost', {postData:postData})
    // .then(function(addedPost){
    //   console.log(addedPost);
    // })
    // });


    // $('#submitPostIllustrationButton').on('click', function (e) {
    //     var postContent       = $('#summernote2').summernote('code'),
    //         postType          = "illustration";
    
    //     var postData = {
    //       postContent:postContent,
    //       postType:postType
    //     }
    
    //     console.log(blogTitle + " --- " + blogSubTitle + " --- " + comImage + " --- " + blog);
    
    //     $.post('addPostIllustration', {postData:postData})
    //     .then(function(addedPost){
    //       console.log(addedPost);
    //     })
    
    //     });
            

    // $('#submitShortWordsButton').on('click', (e) => {
    //     $.post('addCartoon')
    //     .then((addedPost) => {
    //     console.log(addedPost);
    //     })
    //     });

    $('#articleDd').on('click', (e)=>{     
        $("#articleForm").removeClass("visibility-true");
        $("#poetryForm").addClass("visibility-true");
        $("#illustrationForm").addClass("visibility-true");
        $("#cartoonForm").addClass("visibility-true");
        $("#shortWordsForm").addClass("visibility-true");
        $(".dropdown-item").removeClass("active");
        $("#articleDd").addClass("active");
    });

    $('#poetryDd').on('click', (e)=>{     
        $("#poetryForm").removeClass("visibility-true");
        $("#articleForm").addClass("visibility-true");
        $("#illustrationForm").addClass("visibility-true");
        $("#cartoonForm").addClass("visibility-true");
        $("#shortWordsForm").addClass("visibility-true");
        $(".dropdown-item").removeClass("active");
        $("#poetryDd").addClass("active");
    });

    $('#illustrationDd').on('click', (e)=>{ 
        $("#illustrationForm").removeClass("visibility-true");
        $("#articleForm").addClass("visibility-true");
        $("#poetryForm").addClass("visibility-true");
        $("#cartoonForm").addClass("visibility-true");
        $("#shortWordsForm").addClass("visibility-true");
        $(".dropdown-item").removeClass("active");
        $("#illustrationDd").addClass("active");
    });

    $('#cartoonDd').on('click', (e)=>{ 
        $("#cartoonForm").removeClass("visibility-true");
        $("#illustrationForm").addClass("visibility-true");
        $("#articleForm").addClass("visibility-true");
        $("#poetryForm").addClass("visibility-true");
        $("#shortWordsForm").addClass("visibility-true");
        $(".dropdown-item").removeClass("active");
        $("#cartoonDd").addClass("active");
    });

    $('#shortWordsDd').on('click', (e)=>{ 
        $("#shortWordsForm").removeClass("visibility-true");
        $("#illustrationForm").addClass("visibility-true");
        $("#cartoonForm").addClass("visibility-true");
        $("#articleForm").addClass("visibility-true");
        $("#poetryForm").addClass("visibility-true");
        $(".dropdown-item").removeClass("active");
        $("#shortWordsDd").addClass("active");
    });

    $('#validate input[type=radio]').on( (e)=>{ 
        $("#").prop('checked', true);
    });

    $('.shareButton').on('mouseover', function(e){ 
        $(this).next().show();
    });

    $('.shareButton').on('mouseout', (e)=>{ 
        $('.showShare').hide();
    });

    $('.showShare').on('mouseover', function(e){ 
        $(this).prev().css("color", "red");
    });

    $('.showShare').on('mouseout', function(e){ 
        $('.shareButton').css("color", "#777777");
    });

    $('#sAlertButton').on('click', function(e){
    const {value: url} = Swal.fire({
      input: 'url',
      inputPlaceholder: 'Enter the URL'
    });

    $('#profileNav').on('mouseover', function(e){ 
        alert("test");
    });
    
    if (url) {
      Swal.fire('Entered URL: ' + url)
    }
    });
  
    // $('#articleForm').on('click', function(e){

    //         var data = new FormData($('#uploadForm')[0]);

    // alert(title);

    // $.ajax({
    //     type: "POST",
    //     url: '/addTry',
    //     contentType: false,
    //     processData: false,
    //     cache: false,
    //     data: data,
    //     success: function (data, text) {
    //     },
    //     error: function (request, status, error) {
    //         //error handling here.
    //     }
    // });
    // });

    $("#articleForm").submit( function(e){
        event.preventDefault();

        var formData = new FormData(document.getElementById('articleForm'));
        
        $.ajax({
        type: "POST",
        url: '/addTry',
        data: formData,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
         }).done((res)=>{
             if(res.success) {
                 alert(res.response)
             }else{
                 alert(res.response)
             }
         })
        });

    $('#editProfile').on('click', function(e){ 
        $('.inputsProfileEdit').css("display", "block");
        $('.profileShows').css("display", "none");
    });

    $('#editProfileCancel').on('click', function(e){ 
        $('.inputsProfileEdit').css("display", "none");
        $('.profileShows').css("display", "block");
        });

    $("#submitEditProfileButton").on('click', function(e){
        event.preventDefault();
    
        var formData = new FormData(document.getElementById('profileEditForm'));
            
        $.ajax({
        type: "POST",
        url: '/editProfile',
        data: formData,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
            }).done((res)=>{
             if(res.success) {
                 alert(res.response);
                $('.inputsProfileEdit').css("display", "none");
                $('.profileShows').css("display", "block");
             }else{
                 alert(res.response)
             }
         })
         });

     $("#submitSignUpButton").on('click', function(e){
           event.preventDefault();
     
           var formData = new FormData(document.getElementById('signUpForm'));

          $.ajax({
          type: "POST",
          url: '/signup',            
          data: formData,
          contentType: false,
          enctype: 'multipart/form-data',
          processData: false,
             }).done((res)=>{
               if(res.success) {
                   alert(res.response)
               }else{
                    alert(res.response)
               }
           })
           });

    $("#submitChangePasswordButton").on('click', function(e){
           event.preventDefault();
  
           var formData = new FormData(document.getElementById('ChangePasswordForm'));
 
           $.ajax({
           type: "POST",
           url: '/changePassword',            
           data: formData,
           contentType: false,
           enctype: 'multipart/form-data',
           processData: false,
              }).done((res)=>{
                if(res.success) {
                    alert(res.response)
                }else{
                     alert(res.response)
                }
            })
     });
            
     $('#editProfilePhotoAhref').on('click', function(e){ 
        $('#sampleFileEditPhoto').show();
        $('#editProfilePhotoFormButton').show();
        $('#editProfilePhotoAhrefCancel').show();
        $(this).hide();
        });

    $('#editProfilePhotoAhrefCancel').on('click', function(e){ 
        $('#sampleFileEditPhoto').hide();
        $('#editProfilePhotoFormButton').hide();
        $('#editProfilePhotoAhref').show();
        $(this).hide();
        });

    $('#editProfilePhotoFormButton').on('click', function(e){ 
        event.preventDefault();
    
        var formData = new FormData(document.getElementById('editProfilePhotoForm'));
            
        $.ajax({
        type: "POST",
        url: '/editProfilePhoto',
        data: formData,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
            }).done((res)=>{
             if(res.success) {
                 alert(res.response)
             }else{
                 alert(res.response)
             }
         })
         });

    // :: 8.0 Wow Active Code
    if (browserWindow.width() > 767) {
        new WOW().init();
    }

})(jQuery);