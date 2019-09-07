import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Img from './Img';
import BoxImg from './BoxImg';
import StyleH1 from './StyleH1';
import LoTrinhHoc from './LoTrinhHoc';
import Lotrinh from './Lotrinh';
import ItemPaper from './ItemPaper';
import StyleH2 from './StyleH2';
import StyleIcon from './StyleIcon';
import BoxText from './BoxText';
import BoxTextLi from './BoxTextLi';
import BoxSkill from './BoxSkill';
import Skills from './Skills';
import StyleH3 from './StyleH3';
import TitleTheP from './TitleTheP';
import Section from '../../components/Section';
import Article from '../../components/Article';
import useStyles from './styles';

function HomePage() {
  const classes = useStyles();
  const notify = () => {
    const toas = JSON.parse(localStorage.getItem('toat'));
    if (toas === 1) {
      toast.success('Đăng nhập thành công !', {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.setItem('toat', 0);
    }
    if (toas === 2) {
      toast.info('Đăng xuất thành công !', {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.setItem('toat', 0);
    }
  };
  useEffect(() => {
    notify();
  }, []);

  return (
    <Article>
      <BoxImg>
        <Img src="https://sas.edu.vn/wp-content/themes/neda/images/backgrounds/background.jpg" />
      </BoxImg>
      <StyleH1 id="titleH1"> Chao mung ban den voi trung tam anh ngu </StyleH1>
      <Section className={classes.root}>
        <Lotrinh container spacing={3}>
          <Grid item md={12}>
            <h1
              style={{
                textAlign: 'center',
                textShadow: '2px -2px 5px #4a3b3b',
              }}
            >
              LỘ TRÌNH HỌC TINH GỌN
            </h1>
          </Grid>
          <Grid item md={4}>
            <ItemPaper>
              <StyleH2>
                <StyleIcon>room</StyleIcon>2 THÁNG ĐẦU
              </StyleH2>
              <BoxText>
                <BoxTextLi>Chuẩn hoá phát âm với bảng IPA</BoxTextLi>
                <BoxTextLi>
                  Bổ sung từ vựng - cấu trúc với chủ điểm giao tiếp về bản thân
                </BoxTextLi>
                <BoxTextLi>
                  Xây dựng nền tảng phản xạ khi giao tiếp tiếng Anh
                </BoxTextLi>
              </BoxText>
            </ItemPaper>
          </Grid>
          <Grid item md={4}>
            <ItemPaper>
              <StyleH2>
                <StyleIcon>room</StyleIcon>2 THÁNG GIỮA
              </StyleH2>
              <BoxText>
                <BoxTextLi>
                  Nâng cấp khả năng nối âm, luyến âm, nhấn âm
                </BoxTextLi>
                <BoxTextLi>
                  Bổ sung từ vựng - cấu trúc với các chủ điểm giao tiếp hàng
                  ngày
                </BoxTextLi>
                <BoxTextLi>X Rèn luyện kỹ năng đàm thoại</BoxTextLi>
                <BoxTextLi>
                  Nâng cao khả năng phản xạ với tốc độ nghe nói của người bản xứ
                </BoxTextLi>
              </BoxText>
            </ItemPaper>
          </Grid>
          <Grid item xs={4}>
            <ItemPaper>
              <StyleH2>
                <StyleIcon>room</StyleIcon>2 THÁNG CUỐI
              </StyleH2>
              <BoxText>
                <BoxTextLi>
                  Học hỏi các kỹ năng BoxTextLiên quan đến trả lời điện thoại
                  trong môi trường làm việc
                </BoxTextLi>
                <BoxTextLi>
                  Nắm được quy trình meeting khi gặp đối tác
                </BoxTextLi>
                <BoxTextLi>
                  Hiểu và viết được 1 CV xin việc đầy đủ các thành phần quan
                  trọng
                </BoxTextLi>
                <BoxTextLi>
                  Kỹ năng viết mail chuyên nghiệp trong môi trường quốc tế
                </BoxTextLi>
              </BoxText>
            </ItemPaper>
          </Grid>
        </Lotrinh>
      </Section>
      <Section className={classes.root}>
        <Grid container spacing={3} justify="center">
          <Grid item md={12}>
            <LoTrinhHoc className={classes.paper}>
              <h1>KẾT QUẢ</h1>
            </LoTrinhHoc>
          </Grid>
          <Grid item md={12}>
            <BoxSkill className={classes.paper}>
              <Skills>
                <StyleH3>Tiếng Anh</StyleH3>
                <TitleTheP>Nghe</TitleTheP>
                <Slider value={[0, 100]} />
                <TitleTheP>Nói</TitleTheP>
                <Slider value={[0, 100]} />
                <TitleTheP>Đọc</TitleTheP>
                <Slider value={[0, 75]} />
                <TitleTheP>Viết</TitleTheP>
                <Slider value={[0, 70]} />
              </Skills>
              <Skills>
                <StyleH3>Cá Nhân</StyleH3>
                <TitleTheP>Giao Tiếp</TitleTheP>
                <Slider value={[0, 80]} />
                <TitleTheP>Làm Việc Nhóm</TitleTheP>
                <Slider value={[0, 85]} />
                <TitleTheP>Lãnh Đạo</TitleTheP>
                <Slider value={[0, 90]} />
                <TitleTheP>Thuyết Trình</TitleTheP>
                <Slider value={[0, 80]} />
              </Skills>
            </BoxSkill>
          </Grid>
        </Grid>
      </Section>
      <div>
        <LoTrinhHoc className={classes.paper}>
          <h1>Địa Điểm Trung Tâm</h1>
        </LoTrinhHoc>
        <iframe
          title="myFrame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.4284941840456!2d108.22073531426422!3d16.043239188896987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c2885ce09f%3A0x62863072a587997f!2s3S+Intersoft+Da+Nang!5e0!3m2!1svi!2s!4v1563500949990!5m2!1svi!2s"
          width="100%"
          height={450}
          frameBorder={0}
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>
      <ToastContainer autoClose={2000} />
    </Article>
  );
}

export default HomePage;
