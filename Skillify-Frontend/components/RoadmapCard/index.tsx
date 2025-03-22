import React from "react";
import { Progress, Button, Typography } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface RoadmapCardProps {
  roadmapName: string;
  description: string;
  progress: number;
  onProgressCalculated: Promise<number>;
  onView: () => void;
  onDelete: () => void;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({
  roadmapName,
  description,
  progress: initialProgress,
  onProgressCalculated,
  onView,
  onDelete,
}) => {
  const [progress, setProgress] = React.useState(initialProgress);

  React.useEffect(() => {
    onProgressCalculated.then((calculatedProgress) => {
      setProgress(calculatedProgress);
    });
  }, [onProgressCalculated]);

  return (
    <div className="w-[300px] rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-200 p-6 bg-white">
      <Title level={4} className="mb-3">
        {roadmapName}
      </Title>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
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
      <div className="flex gap-2">
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={onView}
          className="flex-1 bg-blue-700"
        >
          View Roadmap
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
          className="flex-1"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default RoadmapCard;
