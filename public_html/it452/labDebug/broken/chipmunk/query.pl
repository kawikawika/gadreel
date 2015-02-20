#!/usr/bin/perl
use strict;                            
use CGI::Carp qw( fatalsToBrowser );   
use CGI qw( :standard );  use DBI;  use DBD::mysql;
use POSIX qw(strftime);

# Print HTTP header
print( "Content-type: text/xml; charset=UTF-8\n\n");                                   


print "<movie>\n";
print "<title>Patriot Games</title>\n";
print "<star>Harrison Ford</star>\n";
print "<year>1992</year>\n";
print "</movie>";
