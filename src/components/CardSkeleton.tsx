import styled from "styled-components";

export default function CardSkeleton() {

  return (
    <Container>
      <ImgWrap/>
      <ContentWrap>
        <HotelRating/>
        <HotelName />
        <HotelAddress/>
        <HotelValue/>
        <HotelPrice><p/></HotelPrice>
        <HotelNotPrice><p/></HotelNotPrice>
      </ContentWrap>
    </Container>
  );
  
}

const Container = styled.li`
  position: relative;
  color: white;
    border-radius: none;
  @media (max-width:2560px) {
    width: 100%;
    border-radius: 0;
    margin: 1rem auto;
    box-shadow: rgb(94 94 94 / 20%) 0px 1px 5px 0px;
  };
  @media (max-width: 768px) {
    width: 99%;
    margin: 0.2rem auto;
  };
`;
const ImgWrap = styled.div`
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 25%;
  height: 100%;
  border-radius: 0;
  @media (max-width:2560px) {};
  @media (max-width: 768px) {
    width: 40%;
  }
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
    /* white,
    black */
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
const ContentWrap = styled.div`
  display: inline-block;
  @media (max-width:2560px) {
    margin-left: 25%;
    width: 75%;
    height: 13.5rem;
    padding: 1rem 0.8rem;
  };
  @media (max-width: 768px) {
    margin-left: 40%;
    width: 60%;
    height: 10rem;
    padding: 0.5rem 0.3rem;
  }
`;
const HotelRating = styled.div`
  @media (max-width:2560px) {
    width: 7%;
    height: 1.3rem;
    padding: 0px 4.5px;
  };
  @media (max-width: 768px) {
    width: 26%;
    padding: 0px 3.5px;
  }
  
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
const HotelName = styled.h2`
  @media (max-width:2560px) {
    width: 50%;
    height: 1.3rem;
    margin: 7px 0;
  };
  @media (max-width: 768px) {
    width: 90%;
    height: 1.3rem;
    margin: 0.3rem 0;
  }
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const HotelAddress = styled.div`
  
  color: rgb(104, 104, 136);
  @media (max-width:2560px) {
    width: 40%;
    height: 1rem;
  };
  @media (max-width: 768px) {
    width: 70%;
    height: 1rem;
  }
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
const HotelValue = styled.div`
  display: flex;

  @media (max-width:2560px) {
    width: 30%;
    height: 1.2rem;
    margin-top: 1.2rem;
  };
  @media (max-width: 768px) {
    width: 100%;
    height: 1.2rem;
    margin-top: 0.4rem;
  }
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
const HotelPrice = styled.div`
  p{
    @media (max-width:2560px) {
      margin-top: 2.3rem;
      float: right;
      width: 18%;
      height: 1.2rem;
    };
    @media (max-width: 768px) {
      margin-top: 1rem;
      width: 70%;
      height: 1.1rem;
    }
    background: linear-gradient(
      -250deg,
      #ddd3d3fb,
      #a59e9efa
    );
    background-size: 800% 400%;
    animation: backgroundChange0 5s ease infinite;
    @keyframes backgroundChange0 {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
`;
const HotelNotPrice = styled.div`
  width: 100%;
  height: 1rem;
  float: right;
  p{
    float: right;
    @media (max-width:2560px) {
      width: 15%;
      height: 0.8rem;
      margin-top: 0.1rem;
    };
    @media (max-width: 768px) {
      width: 60%;
      height: 0.8rem;
      margin-top: 0.1rem;
    }

    background: linear-gradient(
      -250deg,
      #ddd3d3fb,
      #a59e9efa
    );
    background-size: 800% 400%;
    animation: backgroundChange0 5s ease infinite;
    @keyframes backgroundChange0 {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
`;
