---
menu: portfolio
title: "Enable Port Forwarding for IPFS on a Fios router"
date: 2022-02-15T23:53:08-05:00
weight: 2
---

<style>.note img{border:1px solid black;}</style>

If you use an IPv4 address and want to share files using the InterPlanetary File System protocol on your home network, [the recommended way is to set port forwarding](https://docs.ipfs.io/how-to/nat-configuration/).

Port forwarding on the router is manufacturer-specific, so this quick guide shows how to do it with Verizon Fios.

Typically most routers use `https://192.168.1.1/` as their admin access IP address.

1. Open a browser and go to the address <https://192.168.1.1/>  
2. Log into your Verizon Fios admin account. Credentials are typically found on the router itself. Otherwise if you've forgotten your password, please contact Verizon customer support.

![Port Forwarding option under Quick Links](/portfolio/port-forwarding-fios-0.png#floatleft)

3a. Under **Quick Links** on the left menu, you may see a category called “Port Forwarding.” Click on it.

3b. You may also access the page from the top menu by going to **Firewall > Port Forwarding**.

## Create a rule for IPFS

Under **Create new port forwarding rule:** select your device’s name. If you don’t know the device name, please refer to the article [Look Up Your Computer's Device Name](https://it.cornell.edu/citsg/look-your-computers-device-name).

In the second dropdown, select **Custom Ports** **TCP** and set it to `4001` (the default IPFS port)

![Setting the dropdowns](/portfolio/port-forwarding-fios-1.png)

Click on the **Add +** button to add your new rule.

![A red button that says "Add"](/portfolio/port-forwarding-fios-2.png)

The rule should appears in the list below the button.

![The device has been added to the list.](/portfolio/port-forwarding-fios-3.png)

You have now enabled port forwarding, and your IPFS node will properly receive incoming requests.

---

**Originally written in** MS Office Word