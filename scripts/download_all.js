/* Version 1.0,  22.09.2025
When I want download more than 1 torrent from rutracker on page like
https://rutracker.org/forum/tracker.php?rid=xxxxxxx I should click
every single link, then on each tab click download button.
It's takes too much time and very annoying. So, this script saves you time :)
Just copy and paste in browser on console tab
Enjoy :)
*/
                                            
const DOWNLOAD_DELAY = 1000; // bro, pls don't set too low value ;)

async function download(ids) {
    const total = ids.length;
    for (let i = 0; i < total; i++) {
        const id = ids[i];
        const downloadLink = document.querySelector(`#tor-tbl a[href="dl.php?t=${id}"]`);
        if (downloadLink) {
            downloadLink.click();
        }
        const progress = Math.round(((i + 1) / total) * 20);
        const bar = '█'.repeat(progress) + '-'.repeat(20 - progress);
        console.clear();
        console.log(`[${bar}] ${i + 1}/${total} ID: ${id}`);
        await new Promise(resolve => setTimeout(resolve, DOWNLOAD_DELAY));
    }
    console.log("✅ Done!");
}

const torrents = document.querySelector('#tor-tbl');
const ids = torrents ? Array.from(torrents.querySelectorAll('a[href*="viewtopic.php?t="]'))
                    .map(link => link.href.match(/\d+$/)?.[0])
                    .filter(Boolean) : [];

download(ids);