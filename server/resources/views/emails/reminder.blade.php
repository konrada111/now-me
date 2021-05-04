@component('mail::message')
    # Reminder about your visit

    Hi {{$name}}
    Your visit's time is {{$visitStart}}

    Thanks,
    {{$name}} {{$lastName}}
@endcomponent
