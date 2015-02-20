#!/usr/bin/perl
use strict;                            
use CGI::Carp qw( fatalsToBrowser );   
use CGI qw( :standard );  use DBI;  use DBD::mysql;
use POSIX qw(strftime);

# Print HTTP header
print( "Content-type: text/plain; charset=UTF-8\n\n");                                   

# Get the current time
my $timestr=strftime ("%Y-%m-%d %H:%M:%S", localtime);

# Print our response
print "this,is,a,new,row,sent,at,this,date,$timestr\n";
