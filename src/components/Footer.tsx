
import { ExternalLink } from "lucide-react";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="mt-12 pb-6">
      <Separator className="mb-6" />
      <div className="container flex items-center justify-center text-sm text-muted-foreground">
        <span>A tool by</span>
        <a
          href="https://www.linkedin.com/in/hemantsharmax/"
          className="inline-flex items-center text-primary hover:underline mx-1"
        >
          Hemant Sharma
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
        <span>at</span>
        <a
          href="https://www.adschoolmaster.com"
          className="inline-flex items-center text-primary hover:underline mx-1"
        >
          AdSchoolMaster
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
