import React, { useEffect, useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chat");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return null;
  }

  return (
    <Flex align="center" justify="center" height="100vh">
      <Container maxW="xl" centerContent>
        <Box
          bg={"white"}
          width={{ base: "95%", sm: "90%", md: "100%" }}
          p={5}
          borderRadius={"10px"}
        >
          <Tabs>
            <TabList>
              <Tab
                _hover={{ color: "black", bg: "transparent" }}
                _selected={{ color: "white", bg: "#353535" }}
                width={"50%"}
              >
                Log In
              </Tab>
              <Tab
                _hover={{ color: "black", bg: "transparent" }}
                _selected={{ color: "white", bg: "#353535" }}
                width={"50%"}
              >
                Sign Up
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>
                  {" "}
                  <Login />{" "}
                </p>
              </TabPanel>
              <TabPanel>
                <p>
                  {" "}
                  <Signup />{" "}
                </p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Flex>
  );
};

export default AccountPage;
