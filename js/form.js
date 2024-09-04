$(document).ready(function() {
    $('.popup__close, .popup__close-button').on('click', function() {
        $('#consultation').hide();
    });

    $('#consultationForm').on('submit', function(event) {
        event.preventDefault(); 

        var formData = $(this).serialize();

        $.ajax({
            url: '/path/to/your/server/script', 
            type: 'POST',
            data: formData,
            success: function(response) {
                alert('Форма успешно отправлена!');
                $('#consultation .popup__close').trigger('click');
            },
            error: function(xhr, status, error) {
                alert('Произошла ошибка при отправке формы. Попробуйте еще раз.');
            }
        });
    });
});
