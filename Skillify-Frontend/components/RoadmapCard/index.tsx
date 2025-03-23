import React from "react";
import { Progress, Button, Typography } from "antd";
import { EyeOutlined, DeleteOutlined, TrophyOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

interface RoadmapCardProps {
  roadmapId: string;
  roadmapName: string;
  description: string;
  progress: number;
  onProgressCalculated: Promise<number>;
  onView: () => void;
  onDelete: () => void;
  onViewCertificate: (id: string) => void;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({
  roadmapId,
  roadmapName,
  description,
  progress: initialProgress,
  onProgressCalculated,
  onView,
  onDelete,
  onViewCertificate,
}) => {
  const router = useRouter();
  const [progress, setProgress] = React.useState(initialProgress);

  React.useEffect(() => {
    onProgressCalculated.then((calculatedProgress) => {
      setProgress(calculatedProgress);
    });
  }, [onProgressCalculated]);

  const handleViewCertificate = (id: string) => {
    router.push(`/certificate?roadmapId=${id}`);
  };

  return (
    <div className="w-full sm:w-[350px] md:w-[400px] rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-200 p-4 sm:p-6 bg-white">
      <Title level={4} className="mb-2 sm:mb-3 text-lg sm:text-xl">
        {roadmapName}
      </Title>

      <div className="mb-3 sm:mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm sm:text-base">Progress</span>
          <span className="text-sm sm:text-base">{progress}%</span>
        </div>
        <Progress
          percent={progress}
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          showInfo={false}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={onView}
          className="w-full sm:flex-1 bg-blue-700"
        >
          View
        </Button>
        <Button
          type="primary"
          icon={<TrophyOutlined />}
          onClick={() => handleViewCertificate(roadmapId)}
          className="w-full sm:flex-1 bg-green-600"
        >
          Certificate
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
          className="w-full sm:flex-1"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default RoadmapCard;
