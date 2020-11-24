import React, { useEffect, useState } from "react";

import DesktopMenu from "@/components/Main/Menu/DesktopMenu/DesktopMenu";
import Footer from "@/components/UI/Footer/Footer";
import Head from "next/head";
import HeaderPrimary from "@/components/UI/Header/HeaderMain/HeaderMain";
import MobileMenu from "@/components/Main/Menu/MobileMenu/MobileMenu";
import Modal from "@/components/UI/Modal/Modal";
import NewUser from "@/components/Main/NewUser/NewUser";
import Spinner from "@/components/UI/Loading/Spinner";
import { device } from "@/styles/Devices";
import styled from "styled-components";
import { useAuth } from "@/utils/hooks/useAuth";
import { useRouter } from "next/router";

export default function Layout({ children, ...props }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const header = user && router.pathname !== "/" ? <HeaderPrimary /> : null;
  const [newUserModal, setNewUserModal] = useState(true);

  useEffect(() => {
    router.prefetch("/home/[section]/[postId]");
  }, []);

  useEffect(() => {
    if (user && router.pathname === "/") {
      router.push(`/home?page=1`, `/home/`);
    }
  }, [user]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  return (
    <>
      {newUserModal && user?.isNewUser ? (
        <Modal
          show={newUserModal}
          handler={() => setNewUserModal((prevValue) => !prevValue)}
        >
          <NewUser />
        </Modal>
      ) : null}
      <Head>
        <title>DevsHub</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        ></meta>
        <meta httpEquiv='content-type' content='text/html; charset=utf-8' />

        <meta content='text/html;charset=utf-8' httpEquiv='Content-Type'></meta>
        <meta content='utf-8' httpEquiv='encoding'></meta>
        <link
          href='https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>

      {header}
      <Container>
        {user ? (
          <Menu>
            <DesktopMenu />
            <MobileMenu />
          </Menu>
        ) : null}
        <MainContent user={user}>{children}</MainContent>
      </Container>
      <Footer />
    </>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  /* background-color: ${({ theme }) => theme.backgrounds.primary}; */
`;
const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const MainContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: ${({ user }) => (user ? "93%" : "100%")};

  @media ${device.tabPort} {
    width: 100%;
  }
`;
const Menu = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  width: 17%;

  @media ${device.tabLand} {
    width: 20%;
  }

  @media ${device.tabPort} {
    height: 0;
    width: 0;
  }
`;