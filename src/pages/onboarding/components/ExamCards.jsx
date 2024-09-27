const examCards = [
  {
    name: "JEE Mains",
    key: "JEE",
    difficulty: "MEDIUM",
    resources: "40K+  Resources",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "GATE",
    key: "GATE",
    difficulty: "HARD",
    resources: "40K+  Resources",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "CAT",
    key: "CAT",
    difficulty: "HARD",
    resources: "40K+  Resources",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "KEAM",
    key: "KEAM",
    difficulty: "MEDIUM",
    resources: "40K+  Resources",
    image: "/placeholder.svg?height=200&width=300",
  },
];

function Card({ children, onClick, data, selectedExam }) {
  console.log("🚀 ~ Card ~ { children, onClick, data, selectedExam }:", {
    children,
    onClick,
    data,
    selectedExam,
  });
  return (
    <div className="relative h-full">
      <div
        className={`h-full overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat bg-[url('examcardbg.png')] border border-[#EAE8E11A] rounded-[23px] cursor-pointer ${
          data.key !== selectedExam
            ? "border-[#EAE8E11A]"
            : "border-[#DE532766]"
        }`}
        onClick={onClick}
      >
        {children}
      </div>
      {selectedExam === data.key && (
        <div className="h-[32px] w-[32px] bg-[#DE5327] absolute top-[16px] right-[16px] flex items-center justify-center rounded-[50%]">
          <img src="tick.png" />
        </div>
      )}
    </div>
  );
}

function CardContent({ children }) {
  return (
    <div className="p-4 h-full flex flex-col justify-between cursor-pointer">
      {children}
    </div>
  );
}

function Input({ placeholder }) {
  return (
    <div className="relative align-left">
      <input
        type="text"
        placeholder={placeholder}
        className="poppins h-[48px] w-[339px] mt-2 p-[4px_12px] w-[calc(100% - 24px)] bg-transparent border border-[rgba(234,232,225,0.2)] rounded-[9px] text-[20px] box-border "
      />
    </div>
  );
}

export default function ExamCards({ setExam, exam }) {
  return (
    <div className=" w-full h-full max-w-4xl mx-auto p-6  text-white">
      <div className="flex justify-between items-center mb-6">
        <div className="text-[20px] poppins font-medium">Popular exams</div>
        <Input placeholder="Search for exams..." />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ height: "calc(100% - 56px)" }}
      >
        {examCards.map((card, index) => (
          <Card
            key={index}
            onClick={() => {
              setExam(card.key);
            }}
            data={card}
            selectedExam={exam}
          >
            <CardContent>
              <div className="flex flex-col justify-between items-start mb-2">
                <div className="text-[28px] clash-display font-medium">
                  {card.name}
                </div>
                <span className="text-xs tracking-[0.8em] font-light pr-2 py-1 text-[#DE5327] rounded-full">
                  {card.difficulty}
                </span>
              </div>
              <p className="text-[14px] poppins font-normal p-[8px_12px] bg-[#FFFFFF1A] w-fit rounded-[32px]">
                {card.resources}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
