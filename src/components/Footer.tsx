import { ExternalLink } from "lucide-react";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="mt-12 pb-6">
      <Separator className="mb-6" />
      <div className="container flex items-center justify-center text-sm text-muted-foreground">
        <span>A tool by</span>
        <a
          href="https://www.adschoolmaster.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 inline-flex items-center text-primary hover:underline"
        >
          AdSchool Master
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;