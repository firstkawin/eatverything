import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodService {

    getMenu(menu, res) {

        switch (menu) {
            case "kapaomhogob":
                return res.redirect('https://i.pinimg.com/originals/6f/9d/13/6f9d133ee92c028963ecac4edea4dd50.jpg');
            case "padpigkang":
                return res.redirect('https://media-cdn.tripadvisor.com/media/photo-s/0f/30/31/6b/pad-prik-kang-gai.jpg');
            case "khijeua":
                return res.redirect('http://www.siamarcheep.com/wp-content/uploads/siamarcheep-16-04-2016-5.jpg');
            case "mukatem":
                return res.redirect('http://cu.lnwfile.com/_/cu/_raw/83/g9/yt.jpg');
            case "komhoyang":
                return res.redirect('https://i.ytimg.com/vi/IOMJUFRDJdM/maxresdefault.jpg');
            case "kaopadtomyum":
                return res.redirect('https://www.hongthongrice.com/home/wp-content/uploads/2017/02/HTR-10Fried-Rice-7.jpg');
            case "mamapadseill":
                return res.redirect('https://i.ytimg.com/vi/-bfTTUlhtBE/maxresdefault.jpg');
            case "sukyhang":
                return res.redirect('https://i.pinimg.com/originals/d6/2e/54/d62e54b071649f88df84db4a1213ed66.jpg');
            case "kapaonhue":
                return res.redirect('https://pbs.twimg.com/media/DihIRD8XcAAJ5Ww.jpg:large');
            case "kaoneumhugob":
                return res.redirect('https://f.ptcdn.info/145/014/000/1388980352-image2-o.jpg');
        }
    }
}
