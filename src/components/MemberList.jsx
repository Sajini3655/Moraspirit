import MemberCard from "./MemberCard";

export default function MemberList({ members = [], selectedMember, onSelect }) {
  if (!members.length) return <p>No members found.</p>;

  return (
    <div className="member-grid">
      {members.map((m) => (
        <MemberCard
          key={m.id}
          member={m}
          selected={selectedMember?.id === m.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}