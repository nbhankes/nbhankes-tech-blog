---
layout: ../../layouts/post.astro
title: "How to Develop WordPress locally using XAMPP"
pubDate: 2025-09-09
description: "This article offers a brief tutorial on getting started with local WordPress development using XAMPP software to run an Apache server and MySQL database."
author: "N. B. Hankes"
isPinned: false
excerpt: This article offers a brief tutorial on getting started with local WordPress development using XAMPP software to run an Apache server and MySQL database.
image:
  src:
  alt:
tags: ["WordPress"]
---

Getting started with local WordPress development is easy with XAMPP. XAMPP is a completely free, easy to install Apache distribution containing MariaDB, PHP, and Perl.

## Getting Started

Download XAMPP at apachefriends.org: [XAMPP Download](https://www.apachefriends.org/)

> On Windows machines, install XAMPP directly into the C:\ folder to avoid User Access Control restrictions. The folder path will be C:\xampp

Download WordPress at wordpress.org [WordPress Version Download](https://wordpress.org/download/releases/)

 > Download the Latest WordPress version zip file immediately by clicking here [download latest](https://wordpress.org/latest.zip)


## Insert WordPress Codebase into XAMPP Folder

Extract the WordPress zip file and save it in the C:\xampp\htdocs folder. The name of the folder will be used in the localhost address to access the folder. 

For example, if you save the folder as "wordpress," you will be served the files at the http://localhost/wordpress route once the Apache server is running.

## Open the XAMPP Control Panel 

If you don't have a Desktop shortcut, look for the xampp-control.exe file in C:\xampp. Double click it to launch XAMPP.

This launches the XAMPP Control Panel, which look like this:

<figure>
	<img src="/images/xampp.jpg"  alt="Xampp control panel" style="width:100%;">
</figure>

## Run WordPress locally 

To start the Apache server, click the "Start" button in the Apache row.

Once the server is running, navigate to `http://localhost/<local folder name>` to view the WordPress code you installed in the C:\xampp\htdocs folder location. 