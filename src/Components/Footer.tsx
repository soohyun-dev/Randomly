import styled from "styled-components";

export default function Footer() {
  return (
    <>
      <FooterStyle>
        <FooterText>@ Copyright by bmy1320. All right reversed.</FooterText>
        <div>
          <i className="fa fa-github"></i>
        </div>
      </FooterStyle>
    </>
  );
}

const FooterStyle = styled.section`
  text-align: center;
  margin-top: 10em;
  padding: 10em 0 5em 0;
  border-top: 1px solid #eeeeee;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: gray;
`;
