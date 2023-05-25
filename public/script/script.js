$(document).ready(function () {

    // to handle password toggle
    $(".input-group-append").click(function () {
        var passwordInput = $("#password");
        var passwordIcon = $("#togglePassword");

        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            passwordIcon.removeClass("las la-eye").addClass("las la-eye-slash");
        } else {
            passwordInput.attr("type", "password");
            passwordIcon.removeClass("las la-eye-slash").addClass("las la-eye");
        }
    });


    // Toggle Password Visibility
    $('.toggle-password').click(function () {
        $(this).toggleClass('fa-eye fa-eye-slash');
        var input = $('#password');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });
});