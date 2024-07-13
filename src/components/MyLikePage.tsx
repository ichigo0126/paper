import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Divider,
  VStack,
  HStack,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import Profile from "./detail_area/Profile";
import Review from "./detail_area/Review";

type ContentType = {
  name: string;
  username: string;
  description: string;
  isFollowing: boolean;
};

const postContent = [
  {
    name: "秋田君",
    username: "katikati_yane",
    description:
      "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。",
    year: "YYYY/MM/dd",
    title: "次世代プログラミング: 未来のコードを書く",
    id: 1,
    valueCount: 2000,
  },
  {
    name: "祖父江君",
    username: "katikati_yane_2",
    description:
      "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。",
    title: "あああああああ",
    year: "YYYY/MM/dd",
    tilte: "カチカチ概論",
    id: 2,
  },
  {
    name: "祖父江君",
    username: "katikati_yane_2",
    description:
      "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。",
    title: "ああああ",
    year: "YYYY/MM/dd",
    tilte: "カチカチ概論",
    id: 3,
  },
];

const postContents = [
  {
    name: "秋田君",
    username: "katikati_yane",
    description:
      "本と記事のレビューが大好きな人、集まれ！新しい作品を発見し、レビューして、いいね＆ブックマークで応援しよう！",
    isFollowing: true,
  },
  {
    name: "秋田君_1",
    username: "katikati_yan",
    description:
      "読書好きの集まる場所でレビューを書いてシェアしましょう！面白い作品に出会ったら、いいね＆ブックマークもよろしく！",
    isFollowing: false,
  },
  {
    name: "秋田君_2",
    username: "katikati",
    description:
      "本と記事のレビューを通じて、読書仲間とつながる場所です。あなたのおすすめ作品をレビューして共有し、他のユーザーと感想を交換しょう。気に入った作品にはいいねを、また読みたい作品にはブックマークを！一緒に読書の楽しさを広げましょう。",
    isFollowing: false,
  },
  {
    name: "秋田君_3",
    username: "katikati",
    description:
      "本と記事のレビューが大好きな人、集まれ！新しい作品を発見し、レビューして、いいね＆ブックマークで応援しよう！",
    isFollowing: true,
  },
  {
    name: "秋田君_4",
    username: "katikati",
    description:
      "本と記事が大好きな読書家。レビューを書いて、他の読書好きとつながろう！お気に入りの作品を見つけて、いいね＆ブックマークも忘れずに。",
    isFollowing: true,
  },
  {
    name: "秋田君_5",
    username: "katikati",
    description:
      "読書コミュニティの一員として、レビューを投稿して感想を共有しましょう。みんなのおすすめ作品にいいねとブックマークを！",
    isFollowing: false,
  },
];

const profile = {
  name: "杉本大志",
  username: "kachikachichinko",
  reviewCount: 2.0,
  valueCount: 10.0,
  description: "かちかちちんこ",
  followCount: 2.0,
  followedCount: 3.0,
};

function FollowPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <Profile
            name={profile.name}
            username={profile.username}
            reviewCount={profile.reviewCount}
            valueCount={profile.valueCount}
            description={profile.description}
            followCount={profile.followCount}
            followedCount={profile.followedCount}
          />
          <Box w={isMobile ? "full" : "69%"}>
            <Box p={4} pb={20} bg="gray.50" borderRadius="3xl" shadow="sm">
              <Divider my={2} borderWidth="2px" borderColor="gray.500" />
              <VStack spacing={6} align="stretch">
                {postContent.map(
                  ({ name, username, year, title, description, id }) => (
                    <Review
                      name={name}
                      username={username}
                      year={year}
                      title={title}
                      description={description}
                      id={id}
                    />
                  )
                )}
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default FollowPage;
