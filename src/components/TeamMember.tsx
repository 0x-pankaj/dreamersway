import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
  socials: {
    facebook?: string;
    twitter?: string;
    instagram: string;
    linkedin: string;
  };
}

export function TeamMember({
  name,
  role,
  image,
  description,
  socials,
}: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-6">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-2">{name}</h3>
        <p className="text-sm text-sky-600 mb-4">{role}</p>
        <p className="text-gray-600 mb-6 text-sm">{description}</p>
        <div className="flex justify-center space-x-4">
          <a
            href={socials.instagram}
            target="_blank"
            className="text-gray-400 hover:text-sky-600 transition-transform hover:-translate-y-1"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            className="text-gray-400 hover:text-sky-600 transition-transform hover:-translate-y-1"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
