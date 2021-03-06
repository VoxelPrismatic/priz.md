/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var cmd_kw__ = [
    "break", "choice", "clip", "cls", "cmdkey", "color", "comp", "copy", "date", "del",
    "doskey", "edit", "erase", "fc", "for", "forfiles", "format", "goto", "if", "label",
    "md", "mkdir", "move", "path", "pause", "print", "prompt", "rd", "rem", "ren",
    "rename", "replace", "rmdir", "robocopy", "set", "timeout", "title", "type", "waitfor",
    "xcopy"
];

var cmd_ext__ = [
    "append", "arp", "assoc", "at", "atmadm", "attrib", "auditpol", "autochk", "autoconv",
    "autofmt", "bcdboot", "bcdedit", "bdehdcfg", "bitsadmin", "bootcfg", "cacls", "call",
    "cd", "certreq", "certutil", "change", "chcp", "chdir", "chglogon", "chgport", "chgusr",
    "chkdsk", "chkntfs", "cipher", "cleanmgr", "Cmd", "cmstp", "compact", "convert",
    "cprofile", "cscript", "dcgpofix", "defrag", "dfsrmig", "diantz", "dir", "diskcomp",
    "diskcopy", "diskpart", "diskperf", "diskraid", "diskshadow", "dispdiag", "dnscmd",
    "driverquery", "echo", "endlocal", "eventcreate", "eventquery", "eventtriggers",
    "evntcmd", "exit", "expand", "extract", "find", "findstr", "finger", "flattemp",
    "fondue", "freedisk", "fsutil", "ftp", "ftype", "fveupdate", "getmac", "gettype",
    "gpfixup", "gpresult", "gpupdate", "graftabl", "help", "helpctr", "hostname", "icacls",
    "inuse", "ipconfig", "ipxroute", "irftp", "jetpack", "klist", "ksetup", "ktmutil",
    "ktpass", "lodctr", "logman", "logoff", "lpq", "lpr", "macfile", "makecab", "manage-bde",
    "mapadmin", "mklink", "mmc", "mode", "more", "mount", "mountvol", "mqbkup", "mqsvc",
    "mqtgsvc", "msdt", "msg", "msiexec", "msinfo32", "mstsc", "nbtstat", "netcfg", "netsh",
    "netstat", "net print", "nfsadmin", "nfsshare", "nfsstat", "nlbmgr", "nslookup",
    "ntbackup", "ntcmdprompt", "ntfrsutl", "openfiles", "pagefileconfig", "pathping",
    "pbadmin", "pentnt", "perfmon", "ping", "pnpunattend", "pnputil", "popd", "powershell",
    "powershell_ise", "prncnfg", "prndrvr", "prnjobs", "prnmngr", "prnport", "prnqctl",
    "pubprn", "pushd", "pushprinterconnections", "qappsrv", "qprocess", "query", "quser",
    "qwinsta", "rcp", "rdpsign", "recover", "reg", "regini", "regsvr32", "relog",
    "repair-bde", "reset session", "rexec", "risetup", "route_ws2008", "rpcinfo", "rpcping",
    "rsh", "rundll32", "rwinsta", "schtasks", "scwcmd", "secedit", "serverceipoptin",
    "Servermanagercmd", "serverweroptin", "setlocal", "setx", "sfc", "shadow", "shift",
    "showmount", "shutdown", "sort", "start", "subst", "sxstrace", "sysocmgr", "systeminfo",
    "takeown", "tapicfg", "taskkill", "tasklist", "tcmsetup", "telnet", "tftp", "time",
    "tlntadmn", "tpmvscmgr", "tracerpt", "tracert", "tree", "tscon", "tsdiscon", "tsecimp",
    "tskill", "tsprof", "typeperf", "tzutil", "unlodctr", "ver", "verifier", "verify",
    "vol", "vssadmin-", "wbadmin", "wdsutil", "wecutil", "wevtutil", "where", "whoami",
    "winnt", "winnt32", "winpop", "winrs", "wmic", "wscript"
];

function cmd_str_regex__(m, b, c) {
    var st = "";
    var incode = false;
    for(var d of c.split('')) {
        if(d == "%" && !incode) {
            st += "</span>%";
            incode = true;
        } else if(d == "%") {
            st += '%<span class="str">';
            incode = false;
        } else if(incode) {
            st += d;
        } else {
            st += d+"\u200b";
        }
    }
    return `<span class="str">${b}${st}${b}</span>`;
}

var cmd_regex__ = [
    [
        /(")(.*?[^\\\n]|)"/gm,
        cmd_str_regex__
    ], [
        /(')(.*?[^\\\n]|)'/gm,
        cmd_str_regex__
    ],
    ...std_escape__,
    [
        /([$\w\d_-]+)([\(\[.])/gm,
        `<span class="fn">$1</span>$2`
    ],
    ...std_number__,
    [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_cmd__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of cmd_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, cmd_kw__, [], cmd_ext__, [], false, true, [], false);
}
