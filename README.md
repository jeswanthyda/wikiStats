# WikiStats
A real-time large scale streaming dashboard to analyze the Recent Changes on Wikepedia.

## Objectives

## Capabilities

## System Structure

WikiStats takes a multifaceted approach for system designed with robust stream processing,
web backend, and web frontend deployments.
The overall system structure can be seen below as:
![image](https://cloud.githubusercontent.com/assets/9053854/24495974/fbf2e0cc-1547-11e7-846c-25b5fac7f6b1.png)

From a stream processing perspective, the architecture is built as:
![image](https://cloud.githubusercontent.com/assets/9053854/24495974/fbf2e0cc-1547-11e7-846c-25b5fac7f6b1.png)

Additionally, the web analytics dashboard architecture is as follows:
![image](https://cloud.githubusercontent.com/assets/9053854/24495974/fbf2e0cc-1547-11e7-846c-25b5fac7f6b1.png)

## Data Source

This project utilizes the Wikipedia RecentChanges EventSource stream for all statistical
data analysis and stream processing. It is provided by WikiData in the form of a server-sent
event (SSE) stream.
The stream itself can be found at: https://stream.wikimedia.org/v2/stream/recentchange

## Screenshots
Note: Further project details can be found in the associated report.

Created by Sidharth Bambah and Jeswanth Yadagani
