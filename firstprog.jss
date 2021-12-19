set 100 1
set 101 1
set 103 1

input 102
compare 102 103
jumpl result

mark while
mul 100 102 100
min 102 101 102
compare 102 103
jumpm while

mark result
output 100
exit