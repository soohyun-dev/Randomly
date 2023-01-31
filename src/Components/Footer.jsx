import styled from "styled-components";

const FooterStyle = styled.section`
  text-align: center;
  font-weight: 550;
  margin-top: 10em;
  padding: 5em 0 10em 0;
  background-color: #001064;
`;

const FooterText = styled.p`
  color: #757575;
`;

export default function Footer() {
  return (
    <>
      <FooterStyle>
        <FooterText>@ Copyright by bmy1320. All right reversed.</FooterText>
        <div>
          <i class="fa fa-github"></i>
        </div>
      </FooterStyle>
    </>
  );
}
