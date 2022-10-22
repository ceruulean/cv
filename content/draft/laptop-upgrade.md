---
title: "Quest to Upgrade Laptop: The beginning"
weight: 1
draft: true
---

In an effort to fight against manufacturing churn and for the health of our planet, I should purchase as little as possible. I don't *need* a new chassis, a new motherboard, a new processor, a new screen, nor a new keyboard. I've had this Dell XPS 15 laptop for 4 years, but the 256 GB SSD and 8 GB RAM is fairly limiting.

I intend to dual-boot Linux. Windows will be used for Windows-only programs, while Linux will be for everything else. Linux is good enough as a daily driver for browsing the internet, checking email and chatting. It also takes less energy to run, thus you get more bang for your buck from your hardware. Your hardware will last longer (or at least take more abuse before failing).

While switching to Linux is a learning curve, I'm interested in sustainability and reducing my costs.

## Procure parts

Getting hardware that matches is an exercise in patience and googling acronyms. For example, Random-access Memory (RAM) is also just called memory without any extra identifiers.

If you're starting from Windows like I am, you can press **[Windows Key] + [R]**, type `dxdiag` and hit **[Enter]**. This will bring up a screen that tells you the names of your components.

Once you get your computer's model, search for the manufacturer's specifiations and installation instructions (For example, the [Dell XPS 15 9560 Documentation](https://www.dell.com/support/home/en-us/product-support/product/xps-15-9560-laptop/docs) service manuals).

The model I own came with a 250 GB M.2 NVMe SSD, an i7-7700HQ processor and 8 GB RAM, and the smaller 56Wh battery. Before I purchased this model, I knew they had offerings with 1TB HDD storage space. Hence, there should be enough space for another SSD, and even a mounting frame was included. I've opened up my computer before to clean the fans, so I saw the empty bay for myself.

| Component | Part |
|------|------|
| SSD | SAMSUNG 870 QVO Series 2.5" 2TB SATA III |
| SATA Cable | XDYGX - Cable, Hard Drive, SATA 7MM |
| Rubber bumper | 3XYT5 - Grommet ([I got a set from here](https://www.ebay.com/itm/Original-Dell-XPS-9560-9550-Precision-5520-5510-HDD-SATA-Cable-XDYGX-Rubber-Rail-/301999673647))|
| Wifi card | Intel Wireless-Ac 9260 |
|RAM | Crucial 32GB Kit (2x16GB) DDR4 2400 MHz CL17 Laptop Memory CT2K16G4SFD824A |
|Thermal Paste| Grizzly Kryonaut|
| Exta Screws| Order extra screws that will be involved, because it's better to have them than to do without. I googled for ["[LAPTOP MODEL] screw list"](https://www.dell.com/support/manuals/en-us/xps-15-9560-laptop/xps-15-9560-servicemanual/screw-list?guid=guid-328dcc55-d98f-4173-a3dd-26be2f041bf7&lang=en-us). |

**SATA SSD**: [BvilleBound did the research to find what needs to be ordered to install an extra SSD](https://www.dell.com/community/Laptops-General-Read-Only/Dell-XPS-15-9550-Basic-hard-SSD-drive-parts-missing-diagram-and/m-p/5095382#M910840), which means I have to buy a separate connector cable. Unfortunately, anyone who bought an XPS with a larger battery (the 97Wh) would not have the mounting frame included. There's also a model with a 32 GB NVMe SSD that's only for caching, and I have no idea what it takes to reconfigure it if you wanted to upgrade.

**No Battery:** The battery of the XPS series has historically been crap, so I'm not replacing it. In fact, [power regulators will throttle performance when the battery health turns bad,](https://www.reddit.com/r/techsupport/comments/ih4pjg/can_a_bad_laptop_battery_affect_plugged_in/) and these days, batteries are always turning bad.

For portable computing, a tablet, e-reader or phone are convenient and easier to get external batteries for. Plus, I could use the money for another harddrive to make backups, or for something useful like a [multi USB port](https://www.ebay.com/itm/224107884676).

The 3-cell (56 WHr) battery part number is [H5H20](https://www.amazon.com/H5H20-Battery-Compatible-Precision-Quality/dp/B07S15M34N). Just for reference.

**Wi-fi and Bluetooth 5:** The stock Killer wi-fi card is known for being terrible, and sometimes it disconnects in short spurts, so I'll replace it with a newer model. 
<!-- https://www.ebay.com/itm/383640153541 -->


## Install latest drivers

- Update BIOs
- Update Chipset

## Switch disks to ACHI mode

By default, the XPS uses Intel's RAID technology for disks, but Linux requires [ACHI](https://nvidia.custhelp.com/app/answers/detail/a_id/2435/~/what-is-ahci-and-how-does-it-differ-from-sata-ide-compatibility-mode%3F). If you want to dual-boot, follow the instructions in this order, otherwise you'll have to reinstall Windows.

- Disable BitLocker before starting
- Remember your PC password (not PIN), or else you would be stuck in safe mode forever (with this way of entering safe mode).

1. Run cmd as administrator
    - Click on your Start Menu and type `cmd`.
    - When the Command Prompt shows up, right-click and select **Run As Administrator**.

![Search will best match the Command Prompt](/posts/2021/img/cmd_admin.webp)

1. In the terminal, run this command (keep the curly brackets):

    ```sh
    bcdedit /set {current} safeboot minimal
    ```
<!-- ![Exact command in the prompt](/posts/img/draft/cmd_type_com.png) -->
> If the command doesn't work, try it without `{current}`

3. Restart the computer and enter UEFI/BIOS setup.
4. Change the SATA operation mode from RAID to AHCI.

![BIOS setting with ACHI toggled](/posts/2021/img/bios_switch_ahci.jpg)

5. Save changes and exit Setup and Windows will automatically boot to Safe Mode.
6. Launch cmd again, as in step #1.
7. Enter this command...

    ```sh
    bcdedit /deletevalue {current} safeboot
    ```
    ...which returns to Normal Mode.

8. Reboot.

Windows will notice the change to AHCI if you boot into Safe Mode first, then load the correct driver on the next normal boot. Otherwise it will fail on normal boot.

*Source: [LinuxSecurityFreak on StackExchange](https://superuser.com/a/1359471)*

## Pre-download software

- Backup current drive
- Create a Windows Media backup
- Download wifi-card (Intel Wireless-Ac 9260) driver for Linux (just in case, so you don't get locked out with no internet access)

### Download Linux distro of choice

You will need:
- A spare USB (8 GB to be safe)
- A flasher such as [Rufus for Windows](https://rufus.ie/en/) or [Balena Etcher](https://www.balena.io/etcher/) to create a live install (AKA bootable media, bootable drive, live os, etc.)

Overview of steps:

1. Download `.iso` file
2. Verify download is not corrupt or damaged
3. "Burn to disk." In modern times, we flash a USB.

--------

Here's a list of the most consumer-friendly distros:

1. [Pop!\_OS](https://pop.system76.com/) - Comes with drivers out of the box and a hands-free setup.
2. [Elementary OS](https://elementary.io/) - MacOS alternative for those who like that aesthetic.
3. [Zorin OS](https://zorin.com/os/) - Similar to Elementary.
4. [Ubuntu](https://ubuntu.com/) - The previous 3 are based on this distro. Ubuntu has won the market share of a majority of developers and it has a great UI too, but still "hackier" than the others.

#### Verify the download is correct

On some websites, you may see files with a SHA hash given, for example, ["To ensure the integrity of your download, please verify the checksum value.](https://www.dell.com/support/home/en-us/drivers/driversdetails?driverid=0cv13&oscode=wt64a&productcode=xps-15-9560-laptop). Internet interuptions, free-floating particles, or in an unlikely case, hackers who infiltrated the provider, can change the file.

We will assume that the providers haven't been hacked, but we want to check for corruption. On Windows, run CertUtil in cmd:

```sh
certutil -hashfile <NAME_OF_FILE> <ALGO>
```

For example, [Manjaro offers their hashes in SHA1 algorithm](https://manjaro.org/downloads/official/xfce/). 
At the time of writing, the hash for xfce-21.1.4 is `f5a0747dba599984237884fc47453ed1d43f5da7`.

The command would be:

```sh
certUtil -hashfile C:/User/NAME/Downloads/manjaro-xfce-21.1.4-210927-linux513.iso SHA1
```

Wait until it completes. You should see the exact same hash as provided by the website. If any character differs, then redownload the file.

#### Flash USB

Here is a basic [flash guide which covers Linux Mint](https://linuxmint-installation-guide.readthedocs.io/en/latest/burn.html), but the process is the same for all distros.

## Prep done!

It's a waiting game for the parts to be delivered. Take a look at this [Kris De Decker's article](https://solar.lowtechmagazine.com/2020/12/how-and-why-i-stopped-buying-new-laptops.html) which discusses similar sentiments on laptop waste.

I have this gut feeling that hardware is going to be the next big thing in the cycle of trends. If I'm planning to work on computers for the rest of my life, it's an excellent investment. I can't stomach buying another $1,000+ computer, and I want to reduce eco-waste.

Despite supply chain disruptions from Coronavirus, I think my parts came pretty fast, all within a week. It's probably because they're small and easy to ship.

## Supplies for opening up the computer

|Tool|Description|
|-----|------------|
|[Neji-Saurus ESD PZ-57](https://www.ifixit.com/Store/Tools/Screw-Extracting-Pliers/IF145-127?o=1)| Japanese-brand plier for 3mm-8mm heads |
|[TECKMAN 10 in 1 Torx Screwdriver Set](https://www.amazon.com/gp/product/B07BYCPMR5/)| Torx set necessary for opening the case, with some extra convenient tools |
|[Wiha Phillips Screwdriver set](https://www.amazon.com/Wiha-26194-Screwdriver-Phillips-Precision/dp/B000NZ5QGK)| Reliable German brand|

![Neiji-sarus pliers in new packaging. That cartoon dinosaur is so cute!](./img/pliers.webp){.float-right}

The pliers are for taking out stripped screws, because it's going to happen whether you like it or not. Also, it has good reviews and seems well-made.

I got cheap Torx screwdrivers because I don't want to buy Wiha's expensive stuff, but for phillips screws you need quality screwdrivers because of how annoying and easy they are to strip. And let's admit it, the "godly German engineering" cliche has a kernel of truth.

Other stuff to have on hand:

- Q-tips
- Microfiber cloth or high quality (non-shedding) paper towels
- Isopropyl alcohol
- Canned air
- Clean and soft paintbrush (preferably new and high quality so it doesn't shed hair)

## Practice first: clean the fans

I would recommend simply cleaning the fans and spraying dust out of the parts. You'll be surprised how much gunk gets stuck inside.

Check out **Cleaning the cooling module** on [IrisVista's newbie guide](http://www.irisvista.com/tech/newbie-tips.htm) for instrutions.

The disassembly of the laptop is all about: don't rush. Make sure you have the right screwhead for the screw, and it fits well. If the screwdriver doesn't seem to be catching, use a different size. That's a general guideline for screws in general, from furniture to appliances.

I was dumb the first time I took apart my laptop. By not paying attention, I stripped the screws. I had no pliers or any recovery plan. Tiny, stripped laptop screws are the worst, because once they're FUBAR, taking a drill or a dremel close to the sensitive parts is just asking for trouble.

Torx screws (star-shaped) are beginner friendly and less prone to stripping, so if anything has a phillips screw (cross-shaped), I'm going to buy the torx version and replace them. I really hate Phillips heads now. Manufacturers cheap out by using soft metal and phillips design, because torx is more expensive.

## Order of Operations

#### 1. Disconnect the battery

#### 2. Take off heatsink

Take care to unscrew all screws. Some may be hidden under cloth flaps.

Only grab it by the circled parts as shown, where the thermal pads splay from under the spreaders. Don't pick it up from the pipes, marked with X, or else they'll bend.

![Grab the heatsink by the flat base near the paste](./img/heatsink.webp)

Reference: [official guide on how to take out the heatsink](https://www.dell.com/support/manuals/en-us/xps-15-9560-laptop/xps-15-9560-service_manual/procedure?guid=guid-2072a66e-e520-4c42-b582-c5a4a2076a92&lang=en-us).

#### 3. Repaste

Leave the thermal pads alone---the square-shaped squishy stuff. They usually last a good while and don't need much replacing (you can if you order pads and have a set of ESD-safe tweezers).

Jump to **Replacing thermal grease** on [the IrisVista guide](http://www.irisvista.com/tech/newbie-tips.htm), or see [How to Fix Throttling on the Dell XPS 15 7590/9570/9560](https://www.ultrabookreview.com/14875-fix-throttling-xps-15/) for a more detailed repaste guide. You don't need a lot because the paste is meant to fill in microgaps on what appears to be smooth surfaces.

Also the last part of the Ultrabook Review guide adds too much extra padding ([see this forum post for why](http://forum.notebookreview.com/threads/the-consequences-of-repasting-an-xps-15-9560-and-why-most-people-shouldnt-do-it.802670/)).

#### 4. Replace wifi card

Same as found in [Dell's wifi service manual](https://www.dell.com/support/manuals/en-us/xps-15-9560-laptop/xps-15-9560-service_manual/procedure?guid=guid-6f685e0b-92d5-4cef-aa20-0a459d7a8e89&lang=en-us), except my chip's Main and Aux colors were switched. Black terminal on the left, and white on the right, so match the cables accordingly.

#### 5. Replace RAM

Jump to **Removing memory modules** on [the IrisVista guide](http://www.irisvista.com/tech/newbie-tips.htm).

My experience was exactly as they said. When inserting RAM sticks, the side with the barcode sticker goes face-down.

#### 6. Install SSD

I forgot to take pictures of this, but basically it'll look like what's in this guide: [Dell XPS 15 9560 Disassembly (SSD, HDD, RAM Upgrade Options)](https://www.laptopmain.com/dell-xps-15-9560-disassembly-ssd-hdd-ram-upgrade-options/)

## Test the new parts

To make sure the new components are installed properly, use the manufacturer's Diagnostics tool.

1. Go into the boot menu (restart and press F12 when the Dell logo appears).
2. Under "Other Options," there's a Diagnostics option. Select it and you'll be taken to the testing screen.

![Boot screen, under "Other Options" there's Diagnostics](./img/diagnostics_from_bios.webp){style="max"}

> ⚠ **WARNING:** The tests BEEP loudly! I now know where bleepingcomputer.com gets their name.

You can either let it run all the tests, or press ESC to abort.

Press the Arrow Button on the bottom right to test components individually.

![Pressing escape to abort](./img/escape_initial_test.webp)

Here, you can test each part individually, such as the hard drives (despite being called HDD, the SSD is installed there).

![Individual component testing screen](./img/test_suite_individual.webp)

## Conclusions

To be honest, I orignally skipped testing the hardware because I didn't know better. When I tried to install the OS, I had problems. The Samsung EVO 870 SSD would show up on the filesystem, but I couldn't create new folders within it. The option to create new folders was greyed out, but the original NVMe SSD could still create new files.

When I finally discovered Diagnostics and tested the SSD, it failed. I checked the **Results** tab where it gave out the S/N (serial number), which matched what was on the packaging. The disk was being recognized at least.

Luckily all I had to do was go back into the case and unplug/replug the cable. But if that didn't work, I'd have to order a new cable. If the new cable still wouldn't work, then it would mean the SSD itself is defective.

So anyway, the conclusion is to always test your sh*t!

## Dual Boot

Dual-booting is the practice of having two operating systems on one computer. Usually, people switch from Windows loader (BCD) to the freer GRUB. Installing Linux after Windows will switch to GRUB loader.

## Windows Clean Install

I was surprised at how fast the computer runs after a clean OS wipe. It seems that it's easy to accumulate a lot of junk on a computer, even though I manage my files carefully.

## Before I get boot-happy...

[...switch the Fn and F# keys](https://askubuntu.com/a/843649) in the BIOS. I prefer to use a key by its name, and not by the "Multimedia" feature that's different for every manufacturer.

## Limitations

Initially, I wanted to keep Windows and Linux on separate drives, but it wouldn't work. Due to my insufficient knowledge on how laptops work, I spent a long time trying to achieve the impossible. 

The XPS 15 9560 is hardcoded to only read from the NVMe SSD on initial boot. This is probably a design tradeoff so that manufacturers can easily configure variations of the XPS model. The extra drive slot only mounts after the OS loads.

> ![](./img/37-nosata.webp)
>
> *In Dell BIOS **Settings > General > System Information > Device Information** the harddrive slots are empty even though I installed a Samsung EVO 870, which means the BIOS stage is too early to recognize it.*

Several layers of software has to be preloaded before the concept of a partition even comes up. See [Bootloader Wikipedia diagram](https://en.wikipedia.org/wiki/Booting#/media/File:Flow-diagram-computer-booting-sequences.svg) and [BIOS Boot partition sequence](https://en.wikipedia.org/wiki/BIOS_boot_partition#/media/File:GNU_GRUB_components.svg). 

If you want to dual---or even triple---boot on an XPS 15, all OSes must be on the NVMe. This affects how I can allocate the partitions.

## Partition Tables

In the end, I decided to split the sectors and mix files from each OS. Disk 1 will have both Windows and Linux OS. Disk 2 will be for media files and everyday stuff.

### Windows Disk Manager

Keep the manufacturer's Recovery and Boot Manager partitions.

The table rows listed from top-down are **Purpose, Size, Format, Mount Path**

#### 💽 Disk 1: NVMe (256 GB)

|Boot Manager |Windows OS| Recovery Partitions | `Unallocated`|
|---------|---|---|---|
| 524 MB | 121 GB | Various; adds up to 14 GB | 120 GB |
|EFI (FAT) |NFTS | N/A | N/A|
|N/A|`C:/`| N/A | N/A | N/A|

1. Shrink Windows Drive `C:` in half (or however much you want to allocate to Windows). In my case, it was `114688` MiB (112 GiB). Follow any guide available, [like the one For Dummies](https://www.dummies.com/computers/pcs/how-to-shrink-a-hard-drive-volume-in-windows/).

> ❗ If the manager won't let you shrink, or the available space shows less than what exists, [disable immovable files](https://answers.microsoft.com/en-us/windows/forum/all/windows-disk-management-unable-to-shrink-c-drive/217c3521-b254-4662-bac9-bc90dc633fab).

2. An unallocated space remains. Linux will go here later.


#### 💽 Disk 2: SATA (2 TB)

1. Right-click the unallocated space and select **Create Simple Volume**.
2. Go through the Wizard, create an NFTS with 500 GB and any drive letter. I chose `S:` for Samsung.

|Windows Personal Files| `Unallocated`|
|---------|----|
| 500 GB | 1.5 TB|
|NFTS | N/A|
|`S:/`| N/A|


### Install Linux from USB

I prefer restarting my computer, plugging in the USB and mashing F12 to the BIOS screen, then selecting the USB stick, but you can do it from Windows Advanced Boot too.

Every Linux OS installer will let you fill in the unallocated partitions. Typically it is good practice to have one partition for OS files mounted at `/` and another for all the personal files mounted at `/home`.

While creating the partition table, format it as GPT, *not* MBR.

#### 💽 Disk 1

Where it says "free space" it should be filled in with one partition.

| Linux OS | 
|---------|
| 120 GB  | 
| ext4 | 
| `/`|

#### 💽 Disk 2

"free space" can be filled with a home partition, and an optional swap partition.

| Linux Personal files|Swap (optional)|
|---------|---|
| 1.5 TB | 2 GB|
|ext4| swap |
| `/home`| N/A|

> 📤 **Swap Partition**  
> If you're using Ubuntu versions 19+, you don't need a swap partition and can go without it ([source](https://ostoday.org/linux/best-answer-do-i-need-a-swap-partition-ubuntu.html)). For a distro like Manjaro, you'll have to set up a `swap` partition that's about 2 GB to 100% of your RAM (if you have 16 GB of RAM, the recommended size of the swap partition can be any amount from 2-16 GB). It is best to stick with 2 GB unless you have special computing needs (like extremely CPU-heavy rendering).

## End result (Ubuntu)

When booting, I get a GRUB menu which lets me choose between Ubuntu and Windows.

![You can select: Ubuntu, Advanced options for Ubuntu, Windows Boot manager (on /dev/nvme0n1p1), or UEFI Firmware Settings](./img/37-grub.webp)

The text is really tiny. You can customize GRUB's font but I'm too lazy, so we'll just use a lower resolution.

#### Larger text (lower resolution)

In `/etc/default/grub` uncomment the line `GRUB_GFXMODE=640x480`:

```
# you can see them in real GRUB with the command `vbeinfo'
GRUB_GFXMODE=640x480
```

Apply changes by running:

```sh
sudo update-grub
```

When you restart the bootloader should take up the whole screen.

## Conclusion

Dual-booting an OS is tricky. It took a good weekend to setup because of limitations in the hardware that I found out the hard way.

Out of the box, the Ubuntu desktop experience takes time to get used to if you're like me who's used Windows my whole life. I have to install additional programs like [gnome-tweaks](https://itsfoss.com/gnome-tweak-tool/) and extensions such as [ArcMenu](https://extensions.gnome.org/extension/3628/arcmenu/) and [Dash-to-Panel](https://extensions.gnome.org/extension/1160/dash-to-panel/) to mimic funcionality that's included in Windows (such as clicking on an open program in the task bar to minimize it). The default Ubuntu GNOME desktop is very pretty, but I don't particularly care for MacOS aesthetic.

If you've installed video game mods before, this process is pretty similar to that. Otherwise if you're like me who's suspicious of having too many package managers, I installed the extensions manually. Here's a guide on how to [install GNOME extensions](https://www.fossmint.com/install-gnome-shell-extensions/) through a variety of methods.

As someone who likes to collect a lot of tools and process a lot of data, I am excited to have a box that comes with first-class support for CLI utilites. Actually, it's amazing I can install almost anything by opening a terminal and copy-pasting some lines. Since I was already installing stuff manually on Windows, I'd have the same workflow for the most part.

Windows sadly will still be needed for Adobe and Microsoft Office, as their market reach is extremely broad. Open source alternatives like Krita are amazing for artists, and GIMP is awesome for all but the most intense Photoshop superusers. There are also [many free video editors](/lists/#video) that give Premiere a run for its money. However, Inkscape and Scribus don't come close to Adobe Illustrator and InDesign.

Well, this is the end of my upgrading efforts. Let's 🤞 I won't need to take apart this computer for another 5 years, other than to clean the fans.