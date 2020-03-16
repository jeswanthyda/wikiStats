# WikiStats
A real-time large scale streaming dashboard to analyze the Recent Changes on Wikipedia.

## Objectives

This project aims to provide an accessible analytics dashboard for Wikipedia's RecentChanges
stream. This can provide insight into Wikipedia's community as well as provide a roadmap
for which areas of Wikipedia are growing or shrinking and at what rate.

## Capabilities

This platform provides monitoring infrastructure for the Wikipedia Recent Changes allowing for
a real-time view and analysis of the fluid nature of Wikepedia's article database.
Additionally, useful information, such as the top users, number of changes, types of changes,
and daily traffic over the week are presented to provide an all encompassing understanding
for Wikepedia's changes.

## System Structure

WikiStats takes a multifaceted approach for system designed with robust stream processing,
web backend, and web frontend deployments.
The overall system structure can be seen below as:
<br><br>
<img height="300" src="https://github.com/SidBambah/WikiStats/blob/master/images/architecture/system_architecture.PNG?raw=true"></img>

From a stream processing perspective, the architecture is built as:
<br><br>
<img height="300" src="https://github.com/SidBambah/WikiStats/blob/master/images/architecture/stream_architecture.PNG?raw=true"></img>

Additionally, the web analytics dashboard architecture is as follows:
<br><br>
<img height="300" src="https://github.com/SidBambah/WikiStats/blob/master/images/architecture/web_architecture.PNG?raw=true"></img>

## Data Source

This project utilizes the Wikipedia RecentChanges EventSource stream for all statistical
data analysis and stream processing. It is provided by WikiData in the form of a server-sent
event (SSE) stream.
The stream itself can be found at: https://stream.wikimedia.org/v2/stream/recentchange

## Screenshots

The home page of the website:
<br><br>
<img height="300" src="https://github.com/SidBambah/WikiStats/blob/master/images/screenshots/homepage.PNG?raw=true"></img>

The main analytics charts and figures:
<br><br>
<img height="300" src="https://github.com/SidBambah/WikiStats/blob/master/images/screenshots/dashboard_1.PNG?raw=true"></img>
<br><br>
<img height="300" src="https://github.com/SidBambah/WikiStats/blob/master/images/screenshots/dashboard_2.PNG?raw=true"></img>

Note: Further project details can be found in the associated report.

Created by Sidharth Bambah and Jeswanth Yadagani
