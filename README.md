# ng accessible datepicker

An angular datepicker directive intended to meet WCAG2.0 guidelines as well as provide some nice extra features to make this whole datepicking thingy much easier and more fun.

## features

Builds calendar view based on the current date (you can pass in a value for initDate if you want to show a different month/date to start from).

Allows you to specify max/min dates, and user cannot select dates outside of the set max/min. Furthermore, the scrolling of months/years is limited to only available dates (you can't scroll past the min/max).

Allows you to prompt for just one date or a range.

Allows you to specify how many calendar months are shown in the datepicker.

## future/intended features

Allow for selecting multiple dates at once, not neccesarily a range.

Some style! (currently naked html)

Control focus for accessibility.

Show full date when selecting a date (for screen-reader only).

Hightlight the selected range.

Show the enddate when range is selected.

Tests!


### to run:

$ gulp serve

