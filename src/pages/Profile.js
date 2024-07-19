import React from 'react';
import styled from 'styled-components';

function Profile() {
    return (
        <>
            <Header />

            <Main>
                <WelcomeTitle>Welkom op je persoonlijke pagina</WelcomeTitle>
                <Section>
                    <SectionTitle>Het is gelukt om in te loggen. U bevindt zich op een beveiligde pagina.</SectionTitle>
                </Section>
            </Main>
        </>
    );
}

const Header = styled.header`
    background-color: #f8f9fa;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Main = styled.main`
    padding: 2rem;
    background-color: #ffffff;
    min-height: calc(100vh - 64px);
`;

const WelcomeTitle = styled.h3`
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 2rem;
`;

const Section = styled.section`
    background-color: #f1f1f1;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    color: #555;
    text-align: center;
`;

export default Profile;