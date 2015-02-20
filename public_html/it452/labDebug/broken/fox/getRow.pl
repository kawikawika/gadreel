#!/usr/bin/perl
use strict;                            
use CGI::Carp qw( fatalsToBrowser );   
use CGI qw( :standard );  use DBI;  use DBD::mysql;
use POSIX qw(strftime);

# Print HTTP header
print( "Content-type: text/plain; charset=UTF-8\n\n");                                   

# Get parameter from the web browser
my $name = param("name");

# NOTE -- in real code, you would probably query a database here.
# We're avoiding that for now, so instead we use an if statement to send back different
# things based on the "lastname" parameter that was sent.

if ($name eq "Fred") {
    print "Fred's favorite hobby is sky-diving";
}
elsif ($name eq "Denise") {
    print "Denise's favorite hobby is rock climbing";
}
elsif ($name eq "John") {
    print "John's favorite hobby is Parcheesi";
}
else {
    print "error, invalid name!";
}
