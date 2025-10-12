import MailIcon from '@share/components/atoms/icons/MailIcon';
import PhoneIcon from '@share/components/atoms/icons/PhoneIcon';
import WebsiteIcon from '@share/components/atoms/icons/WebsiteIcon';
import Image from '@share/components/atoms/Image';
import { MODE_SIZE, MODE_WEIGHT, Text } from '@share/components/atoms/Text';
import { OrganizerProfile } from '@share/types/organizer';

const OrganizerSection = ({
    organizerProfile,
}: {
    organizerProfile: OrganizerProfile | null;
}) => {
    if (!organizerProfile) {
        return null;
    }

    return (
        <div className="px-4">
            <div className="flex flex-col gap-4 bg-white rounded-2xl py-4 px-6 box-shadow-ticket border border-gray-200">
                <Text modeSize={MODE_SIZE[20]} modeWeight={MODE_WEIGHT.LARGE}>
                    Ban tổ chức
                </Text>
                <div className="w-full bg-black h-px mb-2" />
                <div className="flex gap-6">
                    <Image
                        src={organizerProfile.logo_url}
                        alt={organizerProfile.organization_name}
                        className="min-h-fit w-full max-w-[300px] object-cover rounded-xl"
                    />
                    <div className="flex flex-col gap-2">
                        <Text
                            modeSize={MODE_SIZE[20]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            {organizerProfile.organization_name}
                        </Text>
                        <Text>
                            8Wonder là thương hiệu sự kiện âm nhạc quốc tế được
                            phát triển bởi Tập đoàn Vingroup, với khát vọng đưa
                            Việt Nam trở thành điểm đến mới của những lễ hội văn
                            hóa – âm nhạc – du lịch đẳng cấp khu vực và châu Á.
                            <br /> <br />
                            Không chỉ mang nhịp đập của các lễ hội quốc tế đến
                            gần hơn với khán giả Việt, 8Wonder còn thắp lên hành
                            trình đầy cảm xúc – nơi âm nhạc vượt khỏi giới hạn
                            của sân khấu, nơi nghệ sĩ từ khắp các châu lục cùng
                            cất tiếng hát chung, và nơi bản sắc văn hoá Việt Nam
                            được lan tỏa mạnh mẽ.
                        </Text>
                        <Text
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="flex items-center gap-2"
                        >
                            <MailIcon /> {organizerProfile.contact_email}
                        </Text>
                        <Text
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="flex items-center gap-2"
                        >
                            <PhoneIcon /> {organizerProfile.contact_phone}
                        </Text>
                        <Text
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="flex items-center gap-2"
                        >
                            <WebsiteIcon /> {organizerProfile.website}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizerSection;
