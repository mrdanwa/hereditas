/*----------------------------------------------

[ALL CONTENTS]

1. Preloader
2. Responsive Menu
3. Navigation
4. Slides
5. counterUp
6. AOS
7. Wow JS

/*----------------------------------------------
1. Preloader
----------------------------------------------*/
(function ($) {
  "use strict";

  $(window).on("load", function () {
    $(".preloader-wapper").addClass("loaded");

    if ($(".preloader-wapper").hasClass("loaded")) {
      $(".preloader-main")
        .delay(1200)
        .queue(function () {
          $(this).remove();
        });
    }
  });
})(jQuery);

/*----------------------------------------------
2. Responsive Menu
----------------------------------------------*/
(function ($) {
  "use strict";

  // Clone the navbar for the responsive menu
  function navResponsive() {
    let navbar = $(".navbar .items");
    let menu = $("#menu .items");

    menu.html("");
    navbar.clone().appendTo(menu);

    $(".menu .icon-arrow-right")
      .removeClass("icon-arrow-right")
      .addClass("icon-arrow-down");
  }

  navResponsive();

  // Re-trigger cloning on window resize
  $(window).on("resize", function () {
    navResponsive();
  });

  // Add a class for dropdowns based on the number of child items
  $(".menu .dropdown-menu").each(function () {
    var children = $(this).children(".dropdown").length;
    $(this).addClass("children-" + children);
  });

  // Add 'prevent' class to nav items with dropdowns
  $(".menu .nav-item.dropdown").each(function () {
    var children = $(this).children(".nav-link");
    children.addClass("prevent");
  });

  // Toggle dropdown menu and rotate icon-arrow-down
  $(document).on("click", "#menu .nav-item .nav-link", function (event) {
    if ($(this).hasClass("prevent")) {
      event.preventDefault();
    }

    var nav_link = $(this);
    var parentNav = nav_link.closest(".nav-item"); // Get the parent nav-item
    var currentDropdown = nav_link.next(".dropdown-menu"); // Get the current dropdown
    var arrowIcon = nav_link.find(".icon-arrow-down"); // Get the arrow icon

    // Close sibling dropdowns and reset their arrow icons
    parentNav
      .siblings()
      .find(".dropdown-menu.show")
      .slideUp(300)
      .removeClass("show");
    parentNav.siblings().find(".icon-arrow-down").removeClass("rotate-arrow"); // Reset arrow rotation

    // Toggle the current dropdown and rotate the arrow icon
    currentDropdown.slideToggle(300).toggleClass("show");
    arrowIcon.toggleClass("rotate-arrow"); // Add rotation class to arrow icon

    if (nav_link.hasClass("smooth-anchor")) {
      $("#menu").modal("hide");
    }
  });
})(jQuery);

/*----------------------------------------------
3. Navigation
----------------------------------------------*/
(function ($) {
  "use strict";

  var position = $(window).scrollTop();
  var navbar = $(".navbar");
  var toTop = $("#scroll-to-top");

  // Hide navbar initially if scroll position > 0
  $(document).ready(function () {
    if (position > 0) {
      navbar.hide();
    }
  });

  toTop.hide();

  // Sticky and fade behavior when scrolling
  $(window).scroll(function () {
    let scroll = $(window).scrollTop();
    let navbar = $(".navbar");

    if (!navbar.hasClass("relative")) {
      if (scroll > position) {
        if (window.screen.width >= 767) {
          navbar.fadeOut("fast");
        } else {
          navbar.addClass("navbar-sticky");
        }
        toTop.fadeOut("fast");
      } else {
        if (position <= 76) {
          navbar.slideDown("fast").removeClass("navbar-sticky");
        } else {
          navbar.slideDown("fast").addClass("navbar-sticky");
        }

        if (position > 1023) {
          if (window.screen.width >= 767) {
            toTop.fadeIn("fast");
          }
        } else {
          toTop.fadeOut("fast");
        }
      }
      position = scroll;
    }
  });

  // Smooth scrolling for internal links
  $(".nav-link").each(function () {
    let href = $(this).attr("href");
    if (
      href.length > 1 &&
      href.indexOf("#") != -1 &&
      href.indexOf("index.html") === -1
    ) {
      $(this).addClass("smooth-anchor");
    }
  });

  // Smooth scroll on click
  $(document).on("click", ".smooth-anchor", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top,
      },
      500
    );
  });

  // Prevent default action for empty anchor links
  $(document).on("click", 'a[href="#"]', function (event) {
    event.preventDefault();
  });
})(jQuery);

/*----------------------------------------------
4. Slides
----------------------------------------------*/
(function ($) {
  "use strict";

  var midSlider = new Swiper(".slider-mid", {
    autoplay: true,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1023: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
})(jQuery);

/*----------------------------------------------
5. counterUp
----------------------------------------------*/
(function ($) {
  "use strict";

  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 1000,
          delay: 10,
        });
        el.classList.add("is-visible");
      }
    });
  };

  const IO = new IntersectionObserver(callback, { threshold: 1 });

  // Use querySelectorAll and loop through each '.counter' element
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => IO.observe(counter));
})(jQuery);

/*----------------------------------------------
6. AOS
----------------------------------------------*/
(function ($) {
  "use strict";

  AOS.init();
})(jQuery);

/*----------------------------------------------
7. Wow JS
----------------------------------------------*/
(function ($) {
  "use strict";

  new WOW().init();
})(jQuery);
