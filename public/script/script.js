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
});