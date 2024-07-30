---
menu: portfolio
title: "Enable Port Forwarding for IPFS on a Fios router"
date: 2022-02-15T23:53:08-05:00
weight: 2
---

<style>.note img{border:1px solid black;}</style>

If you use an IPv4 address and want to share files using the InterPlanetary File System protocol on your home network, [the recommended way is to enable port forwarding](https://docs.ipfs.io/how-to/nat-configuration/).

Port forwarding on the router is manufacturer-specific, so this guide shows how to do it with Verizon Fios.

Typically most routers use `https://192.168.1.1/` as the default admin login.

1. Open a browser and go to the address <https://192.168.1.1/>  
2. Log into your Verizon Fios admin account. Credentials are typically found on the bottom of the router.

![Router credentials sticker](/portfolio/port-forwarding-fios-5.png)

If you've forgotten your password, please contact Verizon customer support.

3. When you are logged in the admin page, there are two ways to access Port Forwarding settings:

![Port Forwarding option under Quick Links](/portfolio/port-forwarding-fios-0.png#floatleft)

a. Under **Quick Links** on the left menu, click on the category **Port Forwarding**.

b. From the top menu by going to **Firewall > Port Forwarding**.


## Create a rule

1. In the first dropdown (under **Create new port forwarding rule:**), select your device's name. If you don’t know the device name, please refer to the article [Look Up Your Computer's Device Name](https://it.cornell.edu/citsg/look-your-computers-device-name).

![Setting the dropdowns](/portfolio/port-forwarding-fios-1.png)

2. In the following dropdowns, select **Custom Ports** and **TCP**.
3. Enter `4001` (the default IPFS port).
4. Click the **Add +** button to finish adding the rule.

![A red button that says "Add"](/portfolio/port-forwarding-fios-2.png)

The rule has been created and appears in the list.

![The device has been added to the list.](/portfolio/port-forwarding-fios-3.png)

You have now enabled port forwarding, and your IPFS node will properly receive incoming requests.

---