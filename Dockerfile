FROM node

RUN npm install -g @angular/cli

WORKDIR /projects

CMD [ "/bin/bash" ]
