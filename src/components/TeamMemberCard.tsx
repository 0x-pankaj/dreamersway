import Image from 'next/image';
import { TeamMember } from '@/types';

interface TeamMemberCardProps {
    member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-center p-6 text-center">
            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-secondary">
                <Image
                    src={member.photo_url || '/placeholder-avatar.jpg'}
                    alt={member.name}
                    fill
                    className="object-cover"
                />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
            <p className="text-primary font-medium text-sm mb-3">{member.designation}</p>
            {member.bio && (
                <p className="text-gray-500 text-sm line-clamp-3">
                    {member.bio}
                </p>
            )}
        </div>
    );
}
