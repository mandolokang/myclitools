# myclitools
==========================================
File Transformer
Transform Your Log File Into [json, text]
==========================================
Options:
         -f or --f or --file or file : flags for file origin
        Usages:
                 node index.js -f {file_path}
                 e.g: node.index.js -f /Documents/Folder/error.log


         -t or --t or --transform or transform : flags for transform file extension 

        Usages:
                 node index.js -f {file_path} -t {file_format}
                 e.g: node.index.js -f /Documents/Folder/error.log -t json/text
                 Available file format: JSON || TEXT


         -o or --o or --output or output : flags for file target output directory
        Usages:
                 node index.js -f {file_path} -t {file_format} -o {target_output_directory}
                 e.g: node.index.js -f /Documents/Folder/error.log -t json -o /Documents/Folder/
                PS: if target output not provide then the result transformed file will be storage at {./storage} folders
